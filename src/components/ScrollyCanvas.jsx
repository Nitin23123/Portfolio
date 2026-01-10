import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useSpring } from 'framer-motion';

/**
 * ScrollyCanvas Component
 * 
 * Renders a high-performance scroll-linked animation using HTML5 Canvas.
 * Scrubs through an image sequence based on the page's scroll position.
 */
const ScrollyCanvas = () => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll progress from 0 to 1
    const { scrollYProgress } = useScroll();

    // Configuration
    const frameCount = 75;
    const folderPath = '/sequence/'; // Public folder path

    // Helper: Generate filename (frame_000.png)
    const getFramePath = (index) => {
        const paddedIndex = String(index).padStart(3, '0');
        return `${folderPath}frame_${paddedIndex}.png`;
    };

    // 1. Preload Images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            let loadedCount = 0;

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = getFramePath(i);

                const onLoad = () => {
                    loadedCount++;
                    if (loadedCount === frameCount) {
                        setImages(loadedImages);
                        setIsLoaded(true);
                    }
                };

                img.onload = onLoad;
                img.onerror = () => {
                    console.error(`Failed to load frame: ${i}`);
                    // Still count it to avoid blocking the site
                    onLoad();
                };

                loadedImages.push(img);
            }
        };

        loadImages();
    }, []);

    // 2. Render Loop / Draw Function
    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        const img = images[index];

        // Canvas dimensions
        const cw = canvas.width;
        const ch = canvas.height;

        // Image dimensions
        const iw = img.width;
        const ih = img.height;

        // Object-fit: cover logic
        const scale = Math.max(cw / iw, ch / ih);
        const x = (cw - iw * scale) / 2;
        const y = (ch - ih * scale) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, x, y, iw * scale, ih * scale);
    };

    // 3. Handle Canvas Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame on resize (approximation)
                if (isLoaded) {
                    const progress = scrollYProgress.get();
                    const frameIndex = Math.min(
                        frameCount - 1,
                        Math.floor(progress * frameCount)
                    );
                    renderFrame(frameIndex);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, scrollYProgress]);

    // 4. Bind Scroll to Frame Index
    // 4. Smooth Physics-based Scrolling
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.2,
        stiffness: 75,
        damping: 15,
        restDelta: 0.001
    });

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        // Map smooth progress to frame index
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * (frameCount - 1))
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    return (
        <div className="fixed inset-0 z-[-1] bg-black">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white/20">
                    Loading sequence...
                </div>
            )}
        </div>
    );
};

export default ScrollyCanvas;
