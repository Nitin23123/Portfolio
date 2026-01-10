import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import profileImg from '../assets/profile.png';

import ScrambleText from './ScrambleText';

/**
 * Hero Component
 * 
 * The main landing section of the portfolio. Features:
 * - Scramble text effect for the main headline
 * - Infinite rolling text animation on hover (Nitin Tanwar)
 * - Parallax profile image reveal triggered by scroll
 */
const Hero = () => {
    const footerRef = useRef(null);

    // Track scroll progress relative to the footer element
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end start"]
    });

    // Parallax & Reveal Transforms based on Scroll
    const y = useTransform(scrollYProgress, [0, 1], [-20, 20]); // Subtle vertical movement
    const scale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]); // Zoom out effect
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]); // Fade in
    const blur = useTransform(scrollYProgress, [0, 0.3], ["5px", "0px"]); // Blur to focus

    return (
        <section className="min-h-screen bg-transparent flex flex-col pt-32 md:pt-48 relative overflow-hidden font-sans">

            {/* Top Section: Headlines & Bio */}
            <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-auto w-full max-w-[1920px] mx-auto h-full">

                {/* Animated Headline - Left Column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-start"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
                        {/* Staggered scramble effects */}
                        <ScrambleText text="Web Development" className="block" />
                        <ScrambleText text="Design" className="block" delay={200} />
                        <ScrambleText text="UI/UX" className="text-gray-400 block" delay={400} />
                    </h1>
                </motion.div>

                {/* Bio Description - Right Column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col justify-start pt-2 lg:items-end"
                >
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] text-white font-medium leading-[1.3] tracking-normal max-w-xl text-left lg:text-left">
                        I believe creativity isn't just a skill, it's a mindset. Born from a passion for bold ideas and beautifully crafted storytelling.
                    </p>
                </motion.div>
            </div>

            {/* Interactive Name Display - 3D Rolling Letter Effect */}
            <div className="w-full mt-16 md:mt-32 flex justify-center perspective-[1000px]">
                <h1 className="text-[15.5vw] leading-[0.75] font-black tracking-[-0.06em] text-center text-white/10 select-none cursor-default flex justify-center gap-2 md:gap-4 flex-wrap">
                    {"Nitin Tanwar".split(" ").map((word, wordIndex) => (
                        <div key={wordIndex} className="flex">
                            {word.split('').map((char, charIndex) => (
                                <div key={charIndex} className="relative overflow-hidden h-[1em]">
                                    <motion.span
                                        initial={{ y: 0 }}
                                        whileHover={{ y: "-150%" }} // Roll up to show duplicate char
                                        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                        className="relative block"
                                    >
                                        <span className="block">{char}</span>
                                        {/* Duplicate char positioned below for the loop effect */}
                                        <span className="block absolute top-[150%] left-0">{char}</span>
                                    </motion.span>
                                </div>
                            ))}
                        </div>
                    ))}
                </h1>
            </div>

            {/* Footer Section with Parallax Profile Image */}
            <div id="about" ref={footerRef} className="bg-black/60 backdrop-blur-md w-full relative h-[400px] md:h-[500px] overflow-hidden flex flex-col md:flex-row justify-between items-end px-6 md:px-24 border-t border-white/5">

                {/* Spotlight Background Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a1a1a_0%,_#000000_100%)] opacity-30 pointer-events-none" />

                {/* About Me Mini-Bio */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-20 max-w-lg text-left self-center md:mb-0 mb-8"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[1px] bg-zinc-500" />
                        <h3 className="text-zinc-300 text-sm md:text-base font-medium tracking-[0.2em] uppercase">About Me</h3>
                    </div>
                    <p className="text-white text-2xl md:text-3xl lg:text-4xl font-light leading-snug tracking-wide">
                        I'm <span className="font-normal text-white">Nitin Tanwar</span>, a passionate developer creating intuitive and dynamic <span className="text-zinc-400">user experiences.</span>
                    </p>
                </motion.div>

                {/* Profile Image Container with Scroll Animations */}
                <div className="relative w-full max-w-xl h-full flex items-end justify-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ y, scale, opacity, filter: blur }} // Apply scroll transforms
                        className="relative w-full h-[90%] md:h-full"
                    >
                        {/* Image Masked to blend with black background */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={profileImg}
                                alt="Nitin Tanwar"
                                className="w-full h-full object-cover object-top opacity-90 grayscale"
                                style={{
                                    maskImage: 'radial-gradient(circle at 50% 30%, black 40%, transparent 80%)',
                                    WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black 40%, transparent 80%)'
                                }}
                            />
                        </div>

                        {/* Reduced Vignette */}
                        <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,_transparent_30%,_#000000_90%)] opacity-60" />

                        {/* Gradient Overlays for smooth edge blending */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-x from-black/80 via-transparent to-black/80 z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
