import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CustomCursor Component
 * 
 * Renders a custom cursor element that follows the user's mouse movement.
 * Uses pointer-events-none to ensure it doesn't interfere with clicks.
 * Uses mix-blend-difference for high visibility on all backgrounds.
 */
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        /**
         * Updates state with current mouse coordinates
         */
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-16 h-16 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            animate={{
                x: mousePosition.x - 32, // Center the cursor horizontally (width/2)
                y: mousePosition.y - 32, // Center the cursor vertically (height/2)
            }}
            transition={{
                type: "spring",
                stiffness: 150, // Spring tension
                damping: 15,    // Spring resistance
                mass: 0.1       // Object weight
            }}
        />
    );
};

export default CustomCursor;
