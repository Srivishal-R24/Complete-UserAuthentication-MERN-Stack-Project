import { Link } from "react-router-dom";
import { FiLayout, FiShield, FiZap, FiArrowRight } from "react-icons/fi";

const Home = () => {
    // Project statistics array for the data grid display
    const features = [
        {
            icon: <FiShield size="1.25rem" />,
            title: "Advanced Encryption",
            desc: "Secure stateless JSON Web Tokens handling email verification thresholds and automatic session expirations."
        },
        {
            icon: <FiLayout size="1.25rem" />,
            title: "Fluid Design System",
            desc: "Immersive dual-pane view systems engineered using modular CSS utility configurations for responsive viewports."
        },
        {
            icon: <FiZap size="1.25rem" />,
            title: "State Persistence",
            desc: "Controlled React state handling preventing standard browser synchronization delays on secure form validation structures."
        }
    ];

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#fafafa] flex flex-col justify-between relative overflow-hidden select-none">
            
            {/* * BACK MOTION GRADIENT BLOCKS
              * These blocks move smoothly in the background using custom Tailwind pulse/ping/float movements
              */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-300/20 to-purple-400/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-blue-300/20 to-indigo-400/20 rounded-full blur-[150px] pointer-events-none animate-bounce duration-[12000ms] opacity-70" />

            {/* HERO INTRODUCTION MAIN BLOCK */}
            <div className="max-w-6xl w-full mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
                
                {/* LEFT SIDE: Heading Copy Text */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider text-[#515def] uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#515def] animate-ping" />
                        Platform Ecosystem Active
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
                        Secure Gateway <br />
                        <span className="bg-gradient-to-r from-[#515def] to-[#7682ff] bg-clip-text text-transparent">
                            Authentication Hub.
                        </span>
                    </h1>
                    
                    <p className="text-base sm:text-lg font-medium text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        An enterprise-grade authorization engine configured with contextual state management. Featuring fluid animated routing, anti-autofill overrides, and secure token lifecycle handshakes.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        <Link
                            to="/login"
                            className="w-full sm:w-auto h-[52px] px-8 bg-[#515def] hover:bg-[#434fc4] text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200/50 transition-all duration-200 flex items-center justify-center gap-2 group"
                        >
                            <span>Access Dashboard</span>
                            <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <a 
                            href="#features"
                            className="w-full sm:w-auto h-[52px] px-8 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center"
                        >
                            Explore Architecture
                        </a>
                    </div>
                </div>

                {/* RIGHT SIDE: Interactive Abstract Card Display */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative max-w-[360px] w-full aspect-square bg-gradient-to-tr from-[#515def] to-[#7682ff] rounded-[40px] p-8 shadow-2xl shadow-indigo-200 flex flex-col justify-between text-white overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                        {/* Inner glass accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                        
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-bold text-xl">
                            AΩ
                        </div>

                        <div className="space-y-2">
                            <div className="text-xs uppercase tracking-widest text-indigo-200 font-bold">Project Core Architecture</div>
                            <h3 className="text-2xl font-black tracking-tight">System Node v1.4</h3>
                            <p className="text-xs text-indigo-100/90 font-medium leading-relaxed">
                                Connected natively with centralized context layers to orchestrate user identity verification safely.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* LOWER TECHNICAL SPECIFICATIONS DATA GRID */}
            <div id="features" className="w-full bg-white border-t border-gray-100/80 py-16 relative z-10">
                <div className="max-w-6xl w-full mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((item, idx) => (
                            <div key={idx} className="space-y-3 p-4 rounded-2xl hover:bg-gray-50/60 transition-colors duration-200 group">
                                <div className="w-10 h-10 bg-indigo-50 text-[#515def] rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-200">
                                    {item.icon}
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 tracking-tight">
                                    {item.title}
                                </h4>
                                <p className="text-sm font-medium text-gray-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;