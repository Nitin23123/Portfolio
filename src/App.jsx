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

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white cursor-none">
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

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
