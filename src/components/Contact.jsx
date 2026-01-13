import { motion } from 'framer-motion';

/**
 * Contact Component
 * 
 * The final call-to-action section.
 * Features a large typography layout that animates in when scrolled into view.
 */
const Contact = () => {
    return (
        <section id="contact" className="py-32 bg-transparent text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-gray-500 font-medium tracking-wider uppercase mb-4">What's Next?</p>
                    <h2 className="text-5xl sm:text-6xl md:text-8xl font-black mb-12 tracking-tighter">
                        LET'S WORK<br />TOGETHER
                    </h2>

                    <a
                        href="https://www.linkedin.com/in/nitin-tanwar-535018303/"
                        target="_blanpk"
                        rel="noopener noreferrer"
                        className="inline-block px-10 py-4 md:px-12 md:py-5 bg-black text-white rounded-full font-bold text-base md:text-lg hover:bg-gray-900 transition-all hover:scale-105"
                    >
                        Say Hello
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
