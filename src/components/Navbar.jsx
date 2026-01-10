import { motion } from 'framer-motion';
import { FaStarOfLife } from 'react-icons/fa';

/**
 * Navbar Component
 * 
 * Displays the application navigation and a logo with a CMYK glitch hover effect.
 * The navbar is fixed to the top and uses pointer-events to manage interaction zones.
 */
const Navbar = () => {
    // Navigation links displayed in the top right
    const links = ['WORK', 'BLOG', 'ABOUT', 'CONTACT'];

    return (
        <motion.nav
            className="fixed w-full top-0 z-50 p-8 md:p-12 bg-transparent pointer-events-none"
            initial="initial"
            whileHover="hover"
        >
            <div className="flex justify-between items-start pointer-events-auto">
                {/* 
                    Logo Container 
                    Contains multiple layers to create a CMYK separation effect on hover.
                */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-12 h-12 flex items-center justify-center pointer-events-auto"
                >
                    {/* Cyan Layer - Shifts Top-Left/Bottom-Right on hover */}
                    <motion.div
                        className="absolute inset-0 text-cyan-500 mix-blend-screen"
                        variants={{
                            hover: {
                                opacity: 1,
                                x: [-2, 2, -1, 0, 2],
                                y: [1, -1, 2, -2, 1],
                                transition: { repeat: Infinity, duration: 0.2 }
                            },
                            initial: { opacity: 0, x: 0 }
                        }}
                    >
                        <FaStarOfLife className="text-3xl" />
                    </motion.div>

                    {/* Magenta Layer - Shifts Bottom-Left/Top-Right on hover */}
                    <motion.div
                        className="absolute inset-0 text-magenta-500 mix-blend-screen"
                        variants={{
                            hover: {
                                opacity: 1,
                                x: [2, -2, 1, 0, -1],
                                y: [-1, 2, -2, 1, -1],
                                transition: { repeat: Infinity, duration: 0.2, delay: 0.05 }
                            },
                            initial: { opacity: 0, x: 0 }
                        }}
                    >
                        <FaStarOfLife className="text-3xl" style={{ color: '#f0f' }} />
                    </motion.div>

                    {/* Yellow Layer - Shifts Vertically/Horizontally with delay */}
                    <motion.div
                        className="absolute inset-0 text-yellow-500 mix-blend-screen"
                        variants={{
                            hover: {
                                opacity: 1,
                                x: [1, -1, 2, -2, 1],
                                y: [2, -2, 1, -1, 2],
                                transition: { repeat: Infinity, duration: 0.2, delay: 0.1 }
                            },
                            initial: { opacity: 0, x: 0 }
                        }}
                    >
                        <FaStarOfLife className="text-3xl" style={{ color: '#ff0' }} />
                    </motion.div>

                    {/* Main Black Layer - Rotates and scales on hover */}
                    <motion.div
                        className="relative z-10"
                        variants={{
                            hover: { scale: 1.1, rotate: 90 },
                            initial: { scale: 1, rotate: 0 }
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <FaStarOfLife className="text-2xl md:text-3xl text-white" />
                    </motion.div>
                </motion.div>

                {/* Right Stacked Navigation Links */}
                <div className="flex flex-col items-end gap-1">
                    {links.map((item, index) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            // Staggered entrance animation
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="text-[10px] md:text-[12px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-[0.08em] leading-tight font-sans"
                        >
                            {item}
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
