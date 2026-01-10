import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MagneticWrapper = ({ children, strength = 0.5 }) => {
    const ref = useRef(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics springs
    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    // 3D Rotation transform (Tilt)
    // Map mouse movement (-25 to 25) to rotation degrees (-20 to 20) for stronger effect
    const rotateX = useTransform(mouseY, [-25, 25], [20, -20]);
    const rotateY = useTransform(mouseX, [-25, 25], [-20, 20]);

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX);
        y.set(middleY);
    };

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
