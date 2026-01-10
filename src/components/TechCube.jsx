import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TechCube = ({ icon, color }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="w-16 h-16 relative perspective-1000 group"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                    rotateY: 360,
                    rotateX: 360
                }}
                transition={{
                    duration: isHovered ? 2 : Math.random() * 5 + 10, // Spin Up: 2s on hover, 10-15s idle
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Faces Loop */}
                {[
                    { baseTransform: '', translateZ: 32, isFront: true }, // Front
                    { baseTransform: 'rotateY(180deg)', translateZ: 32 }, // Back
                    { baseTransform: 'rotateY(90deg)', translateZ: 32 },  // Right
                    { baseTransform: 'rotateY(-90deg)', translateZ: 32 }, // Left
                    { baseTransform: 'rotateX(90deg)', translateZ: 32 },  // Top
                    { baseTransform: 'rotateX(-90deg)', translateZ: 32 }, // Bottom
                ].map((face, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                        style={{
                            border: `1px solid ${color}60`,
                            background: `linear-gradient(135deg, rgba(0,0,0,0.9), ${color}10)`
                        }}
                        animate={{
                            transform: `${face.baseTransform} translateZ(${isHovered ? 48 : 32}px)`, // Exploded View: 32px -> 48px
                            boxShadow: isHovered
                                ? `inset 0 0 30px ${color}60` // Power Surge: Stronger Inset
                                : `inset 0 0 15px ${color}30`,
                            borderColor: isHovered ? color : `${color}60`
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {face.isFront && (
                            <div
                                className="text-3xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                style={{
                                    filter: `drop-shadow(0 0 ${isHovered ? '20px' : '10px'} ${color})` // Icon Glow Surge
                                }}
                            >
                                {icon}
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {/* Core Glow */}
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl pointer-events-none"
                style={{ backgroundColor: color }}
                animate={{
                    width: isHovered ? '60px' : '40px', // Core Expansion
                    height: isHovered ? '60px' : '40px',
                    opacity: isHovered ? 0.9 : 0.6 // Core Intensity
                }}
                transition={{ duration: 0.3 }}
            />
        </div>
    );
};

export default TechCube;
