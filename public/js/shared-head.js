// shared-head.js — inject once, used across all pages
// Handles: viewport, Google Fonts, favicons
(function () {
    const head = document.head;

    // Viewport
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0';
    head.appendChild(viewport);

    // Google Fonts
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    head.appendChild(preconnect2);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400..700;1,400..700&display=swap';
    head.appendChild(fontLink);

    // Favicons
    const favicons = [
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/public/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/public/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/public/favicon-48x48.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/public/apple-touch-icon.png' },
    ];
    favicons.forEach(function (attrs) {
        const link = document.createElement('link');
        Object.assign(link, attrs);
        head.appendChild(link);
    });
})();
