import { useState, useEffect, useRef } from 'react';

/**
 * ScrambleText Component
 * 
 * Creates a "hacker" style text effect where characters rapidly change before settling
 * on the final text.
 * 
 * @param {Object} props
 * @param {string} props.text - The final text to display
 * @param {string} props.className - CSS classes for styling
 * @param {boolean} props.hover - Whether to trigger effect on hover (default: true)
 * @param {number} props.delay - Initial delay before starting the effect in ms (default: 0)
 */
const ScrambleText = ({ text, className, hover = true, delay = 0 }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null);

    // Characters used for the scrambling effect
    const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    /**
     * Executes the scrambling animation
     */
    const scramble = () => {
        let pos = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            const scrambled = text.split("")
                .map((char, index) => {
                    // If character index is less than current position, show original character
                    if (index < pos) return char;
                    // Otherwise show a random character from the chars string
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            setDisplayText(scrambled);

            // Increment position - controls speed of reveal (1/3 character per frame)
            pos += 1 / 3;

            // Stop animation when all characters are revealed
            if (pos > text.length) clearInterval(intervalRef.current);
        }, 30); // Update every 30ms
    };

    // Effect to run initial scramble with optional delay
    useEffect(() => {
        const timeout = setTimeout(() => {
            scramble();
        }, delay);
        return () => clearTimeout(timeout);
    }, []);

    const handleMouseEnter = () => {
        if (hover) {
            setIsHovered(true);
            scramble();
        }
    };

    return (
        <span
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayText}
        </span>
    );
};

export default ScrambleText;
