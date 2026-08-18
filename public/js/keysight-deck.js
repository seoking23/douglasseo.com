// keysight-deck.js — PDF page viewer with slide navigation for /keysight
(function () {
    'use strict';

    const PDF_SOURCE_URL = '/public/keysight/KeysightAM.pdf';

    const deckElement = document.getElementById('keysightDeck');
    const slideStageElement = document.getElementById('pdfSlideStage');
    const slideCanvasElement = document.getElementById('pdfSlideCanvas');
    const loadingElement = document.getElementById('pdfSlideLoading');
    const prevButton = document.getElementById('deckPrevBtn');
    const nextButton = document.getElementById('deckNextBtn');
    const counterElement = document.getElementById('deckCounter');
    const progressBar = document.getElementById('deckProgress');
    const overviewPanel = document.getElementById('deckOverview');
    const prevClickZone = document.querySelector('.deck-click-zone--prev');
    const nextClickZone = document.querySelector('.deck-click-zone--next');

    if (!deckElement || !slideCanvasElement) {
        console.error('keysight-deck.js: required deck elements not found');
        return;
    }

    if (typeof pdfjsLib === 'undefined') {
        console.error('keysight-deck.js: pdf.js not loaded');
        showError('PDF viewer failed to load. Please refresh the page.');
        return;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const slideCanvasContext = slideCanvasElement.getContext('2d');
    let pdfDocument = null;
    let totalPageCount = 0;
    let currentPageIndex = 0;
    let touchStartX = 0;
    let controlsHideTimer = null;
    let renderTask = null;
    let resizeTimer = null;

    function showError(message) {
        if (loadingElement) {
            loadingElement.textContent = message;
            loadingElement.className = 'pdf-slide-error';
        }
    }

    function hideLoading() {
        if (loadingElement) {
            loadingElement.hidden = true;
        }
        slideCanvasElement.hidden = false;
    }

    function getStageSize() {
        const stageRect = slideStageElement.getBoundingClientRect();
        return {
            width: stageRect.width,
            height: stageRect.height
        };
    }

    async function renderPageToCanvas(pageNumber, targetCanvas) {
        const page = await pdfDocument.getPage(pageNumber);
        const viewportAtScaleOne = page.getViewport({ scale: 1 });
        const stageSize = getStageSize();
        const scale = Math.min(
            stageSize.width / viewportAtScaleOne.width,
            stageSize.height / viewportAtScaleOne.height
        );
        const viewport = page.getViewport({ scale: scale });
        const outputCanvas = targetCanvas || slideCanvasElement;
        const outputContext = outputCanvas.getContext('2d');

        outputCanvas.width = Math.floor(viewport.width);
        outputCanvas.height = Math.floor(viewport.height);

        const pageRenderTask = page.render({
            canvasContext: outputContext,
            viewport: viewport
        });

        await pageRenderTask.promise;
    }

    async function showPage(pageIndex) {
        if (!pdfDocument || pageIndex < 0 || pageIndex >= totalPageCount) {
            return;
        }

        if (renderTask) {
            renderTask.cancel();
            renderTask = null;
        }

        currentPageIndex = pageIndex;

        try {
            const page = await pdfDocument.getPage(pageIndex + 1);
            const viewportAtScaleOne = page.getViewport({ scale: 1 });
            const stageSize = getStageSize();
            const scale = Math.min(
                stageSize.width / viewportAtScaleOne.width,
                stageSize.height / viewportAtScaleOne.height
            );
            const viewport = page.getViewport({ scale: scale });

            slideCanvasElement.width = Math.floor(viewport.width);
            slideCanvasElement.height = Math.floor(viewport.height);

            renderTask = page.render({
                canvasContext: slideCanvasContext,
                viewport: viewport
            });

            await renderTask.promise;
            renderTask = null;
            hideLoading();
            updateControls();
            updateOverviewSelection();
        } catch (error) {
            if (error && error.name === 'RenderingCancelledException') {
                return;
            }
            console.error('keysight-deck.js: failed to render page', pageIndex + 1, error);
            showError('Failed to render slide ' + (pageIndex + 1) + '.');
        }
    }

    function goToPage(pageIndex) {
        showPage(pageIndex);
    }

    function nextPage() {
        goToPage(currentPageIndex + 1);
    }

    function prevPage() {
        goToPage(currentPageIndex - 1);
    }

    function updateControls() {
        if (counterElement) {
            counterElement.textContent = (currentPageIndex + 1) + ' / ' + totalPageCount;
        }

        if (progressBar) {
            progressBar.style.width = ((currentPageIndex + 1) / totalPageCount * 100) + '%';
        }

        if (prevButton) {
            prevButton.disabled = currentPageIndex === 0;
        }

        if (nextButton) {
            nextButton.disabled = currentPageIndex >= totalPageCount - 1;
        }
    }

    function updateOverviewSelection() {
        if (!overviewPanel) {
            return;
        }

        overviewPanel.querySelectorAll('.overview-thumb').forEach(function (thumb, index) {
            thumb.classList.toggle('is-current', index === currentPageIndex);
        });
    }

    async function buildOverviewThumbnails() {
        if (!overviewPanel || !pdfDocument) {
            return;
        }

        overviewPanel.innerHTML = '';

        for (let pageIndex = 0; pageIndex < totalPageCount; pageIndex++) {
            const thumbElement = document.createElement('button');
            thumbElement.type = 'button';
            thumbElement.className = 'overview-thumb';
            thumbElement.dataset.pageIndex = String(pageIndex);
            thumbElement.setAttribute('aria-label', 'Go to slide ' + (pageIndex + 1));

            const numberLabel = document.createElement('span');
            numberLabel.className = 'overview-thumb-number';
            numberLabel.textContent = String(pageIndex + 1);
            thumbElement.appendChild(numberLabel);

            const thumbCanvas = document.createElement('canvas');
            thumbElement.appendChild(thumbCanvas);
            overviewPanel.appendChild(thumbElement);

            thumbElement.addEventListener('click', function () {
                goToPage(pageIndex);
                closeOverview();
            });

            try {
                const page = await pdfDocument.getPage(pageIndex + 1);
                const viewport = page.getViewport({ scale: 0.2 });
                thumbCanvas.width = Math.floor(viewport.width);
                thumbCanvas.height = Math.floor(viewport.height);
                await page.render({
                    canvasContext: thumbCanvas.getContext('2d'),
                    viewport: viewport
                }).promise;
            } catch (error) {
                console.error('keysight-deck.js: failed to render overview thumbnail', pageIndex + 1, error);
            }
        }

        updateOverviewSelection();
    }

    function toggleOverview() {
        if (!overviewPanel || !pdfDocument) {
            return;
        }

        const isOpen = overviewPanel.classList.toggle('is-open');
        overviewPanel.hidden = !isOpen;

        if (isOpen && overviewPanel.childElementCount === 0) {
            buildOverviewThumbnails();
        } else {
            updateOverviewSelection();
        }
    }

    function closeOverview() {
        if (!overviewPanel) {
            return;
        }

        overviewPanel.classList.remove('is-open');
        overviewPanel.hidden = true;
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(function (error) {
                console.error('keysight-deck.js: fullscreen request failed', error);
            });
        } else {
            document.exitFullscreen();
        }
    }

    function showControlsBriefly() {
        deckElement.classList.add('show-controls');
        clearTimeout(controlsHideTimer);
        controlsHideTimer = setTimeout(function () {
            deckElement.classList.remove('show-controls');
        }, 3000);
    }

    function handleKeydown(event) {
        if (overviewPanel && overviewPanel.classList.contains('is-open')) {
            if (event.key === 'Escape') {
                closeOverview();
            }
            return;
        }

        switch (event.key) {
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                event.preventDefault();
                nextPage();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                event.preventDefault();
                prevPage();
                break;
            case 'Home':
                event.preventDefault();
                goToPage(0);
                break;
            case 'End':
                event.preventDefault();
                goToPage(totalPageCount - 1);
                break;
            case 'f':
            case 'F':
                event.preventDefault();
                toggleFullscreen();
                break;
            case 'o':
            case 'O':
                event.preventDefault();
                toggleOverview();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
        }
    }

    function handleTouchStart(event) {
        touchStartX = event.changedTouches[0].screenX;
    }

    function handleTouchEnd(event) {
        const touchEndX = event.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 50) {
            return;
        }

        if (swipeDistance < 0) {
            nextPage();
        } else {
            prevPage();
        }
    }

    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (pdfDocument) {
                showPage(currentPageIndex);
            }
        }, 150);
    }

    async function initPdfDeck() {
        try {
            const loadingTask = pdfjsLib.getDocument(PDF_SOURCE_URL);
            pdfDocument = await loadingTask.promise;
            totalPageCount = pdfDocument.numPages;

            if (totalPageCount === 0) {
                showError('The presentation PDF has no pages.');
                return;
            }

            await showPage(0);
        } catch (error) {
            console.error('keysight-deck.js: failed to load PDF', error);
            showError('Could not load the presentation. Check that KeysightAM.pdf is available.');
        }
    }

    if (prevButton) {
        prevButton.addEventListener('click', function (event) {
            event.stopPropagation();
            prevPage();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function (event) {
            event.stopPropagation();
            nextPage();
        });
    }

    if (prevClickZone) {
        prevClickZone.addEventListener('click', prevPage);
    }

    if (nextClickZone) {
        nextClickZone.addEventListener('click', nextPage);
    }

    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleResize);
    deckElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    deckElement.addEventListener('touchend', handleTouchEnd, { passive: true });
    deckElement.addEventListener('mousemove', showControlsBriefly);

    initPdfDeck();
})();
