import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';

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

    return (
        <div className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white cursor-none">
            {/* AnimatePresence handles the exit animation of the loading screen */}
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {/* Main Content Rendered after loading is complete */}
            {!isLoading && (
                <>
                    <CustomCursor />
                    <Navbar />
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                    <Footer />
                </>
            )}
        </div>
    )
}

export default App
