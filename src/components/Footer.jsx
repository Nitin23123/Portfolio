/**
 * Footer Component
 * 
 * Simple black footer with copyright, social links, and email.
 */
const Footer = () => {
    return (
        <footer className="bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Copyright Section */}
                <div className="mb-8 md:mb-0 text-center md:text-left">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">NITIN TANWAR</h2>
                    <p className="text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                {/* Social Links */}
                <div className="flex gap-8">
                    <a href="mailto:nitin23123@gmail.com" className="text-gray-400 hover:text-white transition-colors">Email</a>
                    <a href="https://www.linkedin.com/in/nitin-tanwar-535018303/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://github.com/Nitin23123" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
