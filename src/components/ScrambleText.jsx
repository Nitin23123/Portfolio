import { useState, useEffect, useRef } from 'react';

const ScrambleText = ({ text, className, hover = true, delay = 0 }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null);
    const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    const scramble = () => {
        let pos = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            const scrambled = text.split("")
                .map((char, index) => {
                    if (index < pos) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            setDisplayText(scrambled);
            pos += 1 / 3;

            if (pos > text.length) clearInterval(intervalRef.current);
        }, 30);
    };

    useEffect(() => {
        // Initial scramble on mount
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
