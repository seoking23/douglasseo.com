/* dotted-surface.js - modular Three.js dotted surface with physics-based ripple effect */

(function () {
    'use strict';

    const LOG_SOURCE = 'dotted-surface.js';

    function initDottedSurface() {
        try {
            if (typeof THREE === 'undefined') {
                console.warn(LOG_SOURCE + ': Three.js not loaded, skipping dotted surface animation');
                return;
            }

            const container = document.getElementById('dottedSurface');
            if (!container || !container.offsetWidth || !container.offsetHeight) {
                console.warn(LOG_SOURCE + ': Dotted surface container not ready or invalid dimensions');
                return;
            }

            const canvas = document.createElement('canvas');
            const glContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!glContext) {
                console.warn(LOG_SOURCE + ': WebGL not supported, skipping dotted surface animation');
                return;
            }

            const SEPARATION = 150;
            const AMOUNTX = Math.max(10, Math.min(40, Math.floor(container.offsetWidth / 30)));
            const AMOUNTY = Math.max(15, Math.min(60, Math.floor(container.offsetHeight / 20)));

            const PHYSICS_CONFIG = {
                mouseForceRadius: 200,
                mouseForceStrength: 4000,
                springStrength: 0.08,
                damping: 0.92,
                maxDisplacement: 100,
                scrollTremorStrength: 0.1,
                scrollTremorDecay: 0.2,
                scrollTremorFrequency: 0.05
            };

            let scene, camera, renderer, geometry, material, points, raycaster, intersectionPlane;
            let count = 0;
            let animationId;
            let isVisible = true;
            let isInitialized = false;

            const mousePosition = new THREE.Vector2();
            const mouseWorld = new THREE.Vector3();
            let isMouseOverCanvas = false;

            let scrollVelocity = 0;
            let scrollTremorPhase = 0;
            let lastScrollY = window.scrollY;

            let originalPositions = [];
            let velocitiesX, velocitiesY, velocitiesZ, displacementsX, displacementsY, displacementsZ;
            let observer;

            try {
                scene = new THREE.Scene();
                scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

                camera = new THREE.PerspectiveCamera(
                    60,
                    container.offsetWidth / container.offsetHeight,
                    1,
                    10000
                );
                camera.position.set(0, 355, 1220);

                renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: window.devicePixelRatio < 2,
                    powerPreference: 'low-power'
                });

                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                renderer.setSize(container.offsetWidth, container.offsetHeight);
                renderer.setClearColor(scene.fog.color, 0);

                container.appendChild(renderer.domElement);

                raycaster = new THREE.Raycaster();
                intersectionPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
            } catch (renderError) {
                console.warn(LOG_SOURCE + ': Failed to initialize Three.js renderer:', renderError);
                return;
            }

            try {
                const positions = [];
                const colors = [];

                geometry = new THREE.BufferGeometry();

                const totalParticles = AMOUNTX * AMOUNTY;

                velocitiesX = new Float32Array(totalParticles);
                velocitiesY = new Float32Array(totalParticles);
                velocitiesZ = new Float32Array(totalParticles);
                displacementsX = new Float32Array(totalParticles);
                displacementsY = new Float32Array(totalParticles);
                displacementsZ = new Float32Array(totalParticles);

                for (let ix = 0; ix < AMOUNTX; ix++) {
                    for (let iy = 0; iy < AMOUNTY; iy++) {
                        const particleX = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                        const particleY = 0;
                        const particleZ = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

                        positions.push(particleX, particleY, particleZ);
                        originalPositions.push(particleX, particleY, particleZ);
                        colors.push(255, 255, 255);
                    }
                }

                geometry.setAttribute(
                    'position',
                    new THREE.Float32BufferAttribute(positions, 3)
                );
                geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

                material = new THREE.PointsMaterial({
                    size: 10,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.7,
                    sizeAttenuation: true
                });

                points = new THREE.Points(geometry, material);
                scene.add(points);
                isInitialized = true;
            } catch (geometryError) {
                console.warn(LOG_SOURCE + ': Failed to create dotted surface geometry:', geometryError);
                if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                }
                if (renderer) {
                    renderer.dispose();
                }
                return;
            }

            function handleMouseMove(event) {
                const rect = renderer.domElement.getBoundingClientRect();
                mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                raycaster.setFromCamera(mousePosition, camera);
                raycaster.ray.intersectPlane(intersectionPlane, mouseWorld);
                isMouseOverCanvas = true;
            }

            function handleMouseLeave() {
                isMouseOverCanvas = false;
            }

            function handleScroll() {
                const currentScrollY = window.scrollY;
                const scrollDelta = currentScrollY - lastScrollY;

                scrollVelocity += Math.min(Math.max(scrollDelta, -50), 50) * 0.1;
                lastScrollY = currentScrollY;
            }

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseleave', handleMouseLeave);
            window.addEventListener('scroll', handleScroll, { passive: true });

            observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    isVisible = entry.isIntersecting;
                });
            }, { threshold: 0.1 });

            observer.observe(container);

            function animate() {
                if (!isInitialized || !isVisible) {
                    animationId = requestAnimationFrame(animate);
                    return;
                }

                try {
                    const positionAttribute = geometry.attributes.position;
                    const currentPositions = positionAttribute.array;

                    let particleIndex = 0;
                    for (let ix = 0; ix < AMOUNTX; ix++) {
                        for (let iy = 0; iy < AMOUNTY; iy++) {
                            const arrayIndex = particleIndex * 3;

                            const originalX = originalPositions[arrayIndex];
                            const originalZ = originalPositions[arrayIndex + 2];

                            const waveY = Math.sin((ix + count) * 0.3) * 50 +
                                Math.sin((iy + count) * 0.5) * 50;

                            if (isMouseOverCanvas) {
                                const deltaX = originalX + displacementsX[particleIndex] - mouseWorld.x;
                                const deltaZ = originalZ + displacementsZ[particleIndex] - mouseWorld.z;
                                const distanceToMouse = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);

                                if (distanceToMouse < PHYSICS_CONFIG.mouseForceRadius && distanceToMouse > 0) {
                                    const forceFactor = 1 - (distanceToMouse / PHYSICS_CONFIG.mouseForceRadius);
                                    const forceStrength = PHYSICS_CONFIG.mouseForceStrength * forceFactor * forceFactor;

                                    const normalizedX = deltaX / distanceToMouse;
                                    const normalizedZ = deltaZ / distanceToMouse;

                                    velocitiesX[particleIndex] += normalizedX * forceStrength * 0.001;
                                    velocitiesZ[particleIndex] += normalizedZ * forceStrength * 0.001;

                                    velocitiesY[particleIndex] += forceStrength * 0.0003 * forceFactor;
                                }
                            }

                            if (Math.abs(scrollVelocity) > 0.01) {
                                const particlePhaseOffset = (ix * 0.3 + iy * 0.2);
                                const tremorDirection = Math.sin(scrollTremorPhase + particlePhaseOffset);
                                const tremorForce = tremorDirection * Math.abs(scrollVelocity) * PHYSICS_CONFIG.scrollTremorStrength;

                                velocitiesX[particleIndex] += tremorForce;
                            }

                            velocitiesX[particleIndex] -= displacementsX[particleIndex] * PHYSICS_CONFIG.springStrength;
                            velocitiesY[particleIndex] -= displacementsY[particleIndex] * PHYSICS_CONFIG.springStrength;
                            velocitiesZ[particleIndex] -= displacementsZ[particleIndex] * PHYSICS_CONFIG.springStrength;

                            velocitiesX[particleIndex] *= PHYSICS_CONFIG.damping;
                            velocitiesY[particleIndex] *= PHYSICS_CONFIG.damping;
                            velocitiesZ[particleIndex] *= PHYSICS_CONFIG.damping;

                            displacementsX[particleIndex] += velocitiesX[particleIndex];
                            displacementsY[particleIndex] += velocitiesY[particleIndex];
                            displacementsZ[particleIndex] += velocitiesZ[particleIndex];

                            const maxDisplacement = PHYSICS_CONFIG.maxDisplacement;
                            displacementsX[particleIndex] = Math.max(-maxDisplacement, Math.min(maxDisplacement, displacementsX[particleIndex]));
                            displacementsY[particleIndex] = Math.max(-maxDisplacement, Math.min(maxDisplacement, displacementsY[particleIndex]));
                            displacementsZ[particleIndex] = Math.max(-maxDisplacement, Math.min(maxDisplacement, displacementsZ[particleIndex]));

                            currentPositions[arrayIndex] = originalX + displacementsX[particleIndex];
                            currentPositions[arrayIndex + 1] = waveY + displacementsY[particleIndex];
                            currentPositions[arrayIndex + 2] = originalZ + displacementsZ[particleIndex];

                            particleIndex++;
                        }
                    }

                    scrollTremorPhase += PHYSICS_CONFIG.scrollTremorFrequency;
                    scrollVelocity *= PHYSICS_CONFIG.scrollTremorDecay;

                    positionAttribute.needsUpdate = true;
                    renderer.render(scene, camera);
                    count += 0.1;
                } catch (animationError) {
                    console.warn(LOG_SOURCE + ': Animation error:', animationError);
                }

                animationId = requestAnimationFrame(animate);
            }

            function handleResize() {
                if (!isInitialized || !container || !camera || !renderer) return;

                try {
                    const width = container.offsetWidth;
                    const height = container.offsetHeight;

                    if (width > 0 && height > 0) {
                        camera.aspect = width / height;
                        camera.updateProjectionMatrix();
                        renderer.setSize(width, height);
                    }
                } catch (resizeError) {
                    console.warn(LOG_SOURCE + ': Resize error:', resizeError);
                }
            }

            function cleanup() {
                try {
                    if (observer) observer.disconnect();
                    window.removeEventListener('resize', handleResize);

                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseleave', handleMouseLeave);
                    window.removeEventListener('scroll', handleScroll);

                    if (animationId) cancelAnimationFrame(animationId);

                    if (scene) {
                        scene.traverse(function (object) {
                            if (object.geometry) object.geometry.dispose();
                            if (object.material) {
                                if (Array.isArray(object.material)) {
                                    object.material.forEach(function (materialItem) { materialItem.dispose(); });
                                } else {
                                    object.material.dispose();
                                }
                            }
                        });
                        scene.clear();
                    }

                    if (renderer) {
                        renderer.dispose();
                        renderer.forceContextLoss();
                        if (container && renderer.domElement && container.contains(renderer.domElement)) {
                            container.removeChild(renderer.domElement);
                        }
                    }

                    isInitialized = false;
                } catch (cleanupError) {
                    console.warn(LOG_SOURCE + ': Cleanup error:', cleanupError);
                }
            }

            window.addEventListener('resize', handleResize);
            window.addEventListener('beforeunload', cleanup);

            animate();

            window.dottedSurfaceCleanup = cleanup;

        } catch (initError) {
            console.warn(LOG_SOURCE + ': Failed to initialize dotted surface:', initError);
        }
    }

    function safeDottedSurfaceInit() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initDottedSurface);
        } else {
            setTimeout(initDottedSurface, 100);
        }
    }

    safeDottedSurfaceInit();
})();
