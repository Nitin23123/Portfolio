import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollyCanvas from './components/ScrollyCanvas';

/**
 * App Component
 * 
 * The root component that orchestrates the entire application.
 * Manages the initial loading state and renders the main application structure.
 * Uses a custom cursor and a single-page scroll layout.
 */
function App() {
    // State to track if the initial loading sequence is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="bg-transparent min-h-screen text-black font-sans selection:bg-black selection:text-white cursor-none">
            {/* AnimatePresence handles the exit animation of the loading screen */}
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {/* Background ScrollyCanvas loads parallel to the loading screen */}
            <ScrollyCanvas />

            {/* Main Content Rendered after loading is complete */}
            {!isLoading && (
                <>
                    <CustomCursor />
                    <Navbar />
                    <Hero />
                    <About />
                    <Experience />
                    <Projects />
                    <Contact />
                    <Footer />
                </>
            )}
        </div>
    )
}

export default App
