import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-32 bg-white text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl font-bold mb-8 tracking-tight">About Me</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-800 leading-relaxed font-normal"
                    >
                        <p className="mb-8">
                            I'm <span className="font-bold">Nitin Tanwar</span>, a passionate developer with a strong focus on creating intuitive and dynamic user experiences.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
