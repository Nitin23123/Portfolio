import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-32 bg-gray-50 text-black">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-gray-500 font-medium tracking-wider uppercase mb-4">What's Next?</p>
                    <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter">
                        LET'S WORK<br />TOGETHER
                    </h2>

                    <a
                        href="mailto:hello@example.com"
                        className="inline-block px-12 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition-all hover:scale-105"
                    >
                        Say Hello
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
