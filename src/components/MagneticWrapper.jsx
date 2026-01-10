import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * MagneticWrapper Component
 * 
 * Creates a magnetic effect where the child element is attracted to the mouse cursor
 * when hovered. Also adds a subtle 3D tilt effect.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The element to be magnetized
 * @param {number} props.strength - The strength of the magnetic pull (default: 0.5)
 */
const MagneticWrapper = ({ children, strength = 0.5 }) => {
    const ref = useRef(null);

    // Mouse position state tracks the raw cursor position relative to the element center
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics springs for fluid movement
    // stiffness: tension of the spring
    // damping: opposition to motion
    // mass: heaviness of the object
    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    // 3D Rotation transform (Tilt Effect)
    // Map mouse movement (-25 to 25) to rotation degrees (20 to -20)
    // As mouse moves down (Y increases), element tilts forward (RotateX positive)
    const rotateX = useTransform(mouseY, [-25, 25], [20, -20]);
    // As mouse moves right (X increases), element tilts right (RotateY positive)
    const rotateY = useTransform(mouseX, [-25, 25], [-20, 20]);

    /**
     * Handles mouse movement over the element
     * Calculates the distance from the center of the element to the cursor
     */
    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate distance from center
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Update motion values
        x.set(middleX);
        y.set(middleY);
    };

    /**
     * Resets position when mouse leaves the element
     */
    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ perspective: 1000, display: 'inline-block' }} // Added inline-block to prevent collapse
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={reset}
                style={{
                    // Apply magnetic effect with strength multiplier
                    x: useTransform(mouseX, (val) => val * strength),
                    y: useTransform(mouseY, (val) => val * strength),
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default MagneticWrapper;
