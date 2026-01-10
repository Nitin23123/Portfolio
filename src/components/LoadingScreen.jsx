import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LoadingScreen Component
 * 
 * Displays a preloader with a "hacker terminal" aesthetic before the main site loads.
 * Features:
 * - Percentage counter
 * - Dynamic loading status text
 * - Typewriter effect for a "console.log" message
 * 
 * @param {Object} props
 * @param {Function} props.onComplete - Callback function when loading finishes
 */
const LoadingScreen = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    // Messages displayed sequentially during loading
    const loadingTexts = [
        "Compiling creativity…",
        "Building components…",
        "Loading React mindset…",
        "Rendering UI…",
        "Optimizing performance…",
        "Deploying portfolio…"
    ];

    // Counter logic: Increments from 0 to 100 with random steps (simulates network traffic/processing)
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev === 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800); // Small delay before unmounting
                    return 100;
                }
                const increment = Math.floor(Math.random() * 10) + 1; // Random increment 1-10%
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    // Update loading text based on progress
    useEffect(() => {
        const index = Math.min(Math.floor(count / 18), 5); // Switch text roughly every 18%
        setTextIndex(index);
    }, [count]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between p-6 md:p-12 text-white font-sans overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }} // Curtain lift exit animation
        >
            {/* Top Left: Loading Indicator */}
            <div className="flex items-start">
                <span className="text-sm font-bold tracking-widest uppercase">
                    LOADING
                </span>
            </div>

            {/* Center: Console Log Message Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <motion.div
                    className="inline-block text-lg md:text-2xl font-mono text-white relative px-4 py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Typewriter effect container */}
                    <motion.div
                        className="overflow-hidden whitespace-nowrap align-bottom inline-block"
                        initial={{ width: 0 }}
                        animate={{ width: "auto" }}
                        transition={{ duration: 2, ease: "linear", delay: 0.2 }}
                    >
                        <span className="text-white">console</span>.<span className="text-white">log</span>
                        <span className="text-white">(</span>
                        <span className="text-white">"Welcome to my portfolio"</span>
                        <span className="text-white">);</span>
                    </motion.div>

                    {/* Blinking Cursor */}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-2 h-6 md:h-8 bg-white ml-1 translate-y-1"
                    />
                </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-end w-full">

                {/* Bottom Left: Dynamic Loading Text */}
                <div className="text-lg md:text-2xl font-light text-white font-mono mb-2 md:mb-4 min-w-[300px]">
                    <motion.span
                        key={textIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block"
                    >
                        {loadingTexts[textIndex]}
                    </motion.span>
                </div>


                {/* Bottom Right: Percentage Counter */}
                <h1 className="text-[8vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter">
                    {count}%
                </h1>
            </div>

            {/* Background Line Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5 -z-10" />

        </motion.div>
    );
};

export default LoadingScreen;
