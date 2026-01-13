import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { FaStarOfLife, FaBars, FaTimes } from 'react-icons/fa';
import MagneticWrapper from './MagneticWrapper';

/**
 * Navbar Component
 * 
 * Displays the application navigation and a logo.
 * Features:
 * - Horizontal layout by default.
 * - Collapses into a 'Menu' button on scroll.
 * - Expands to show links on hover/click of the Menu button.
 */
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const scrolled = latest > 50;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    });

    const links = [
        { name: 'ABOUT ME', id: 'about' },
        { name: 'TECH STACK', id: 'tech-stack' },
        { name: 'WORK EXPERIENCE', id: 'experience' },
        { name: 'PROJECTS', id: 'projects' },
        { name: 'CONTACT ME', id: 'contact' }
    ];

    return (
        <motion.nav
            className="fixed w-full top-0 z-50 p-8 md:p-12 pointer-events-auto"
            initial="initial"
            whileHover="hover"
        >
            <div className="flex justify-between items-center pointer-events-auto">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-12 h-12 flex items-center justify-center cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    {/* Cyan Layer */}
                    <motion.div
                        className="absolute inset-0 text-cyan-500 mix-blend-screen"
                        variants={{
                            initial: { opacity: 0, x: 0, y: 0 },
                            hover: {
                                opacity: 1,
                                x: [-2, 2, -1, 0, 2],
                                y: [1, -1, 2, -2, 1],
                                transition: { repeat: Infinity, duration: 0.2 }
                            }
                        }}
                    >
                        <FaStarOfLife className="text-3xl" />
                    </motion.div>

                    {/* Magenta Layer */}
                    <motion.div
                        className="absolute inset-0 text-magenta-500 mix-blend-screen"
                        variants={{
                            initial: { opacity: 0, x: 0, y: 0 },
                            hover: {
                                opacity: 1,
                                x: [2, -2, 1, 0, -1],
                                y: [-1, 2, -2, 1, -1],
                                transition: { repeat: Infinity, duration: 0.2, delay: 0.05 }
                            }
                        }}
                    >
                        <FaStarOfLife className="text-3xl" style={{ color: '#f0f' }} />
                    </motion.div>

                    {/* Main White Layer */}
                    <motion.div
                        className="relative z-10 text-white"
                        variants={{
                            initial: { scale: 1, rotate: 0 },
                            hover: { scale: 1.1, rotate: 90, transition: { duration: 0.5 } }
                        }}
                    >
                        <FaStarOfLife className="text-2xl md:text-3xl" />
                    </motion.div>
                </motion.div>

                {/* Navigation Container */}
                <div
                    className="flex flex-col items-end"
                    onMouseEnter={() => isScrolled && setIsMenuOpen(true)}
                    onMouseLeave={() => isScrolled && setIsMenuOpen(false)}
                    onClick={() => isScrolled && setIsMenuOpen(!isMenuOpen)} // Toggle on click for mobile
                >
                    <AnimatePresence mode='wait'>
                        {(!isScrolled || isMenuOpen) ? (
                            <motion.div
                                key="links"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                                className={`flex ${isScrolled ? 'flex-col gap-4 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10' : 'hidden md:flex flex-row gap-8'} items-center`}
                            >
                                {links.map((item, index) => (
                                    <MagneticWrapper key={index} strength={0.2}>
                                        <a
                                            href={`#${item.id}`}
                                            className="group relative block px-2 py-1"
                                        >
                                            <span className="relative z-10 text-xs md:text-sm font-bold text-gray-400 group-hover:text-white transition-colors duration-300 uppercase tracking-[0.1em]">
                                                {item.name}
                                            </span>
                                            <motion.span
                                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"
                                            />
                                        </a>
                                    </MagneticWrapper>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu-button"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className={`bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/10 cursor-pointer hover:bg-white/20 transition-colors ${!isScrolled && 'md:hidden'}`}
                            >
                                <FaBars className="text-white text-xl" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
