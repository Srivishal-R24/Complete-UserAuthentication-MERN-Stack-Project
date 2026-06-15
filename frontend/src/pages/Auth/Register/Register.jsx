import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import AuthContext from "../../../AuthContext/AuthContext";

const Register = () => {
    const { handleSubmit } = useContext(AuthContext);
    
    // Controlled inputs state management
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Dynamic Validation Checkers
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
    const isPasswordValid = hasMinLength && hasNumber && hasSpecialChar;

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Safety guard clause blocking weak configurations
        if (!isPasswordValid) {
            Swal.fire({
                title: "Weak Password",
                text: "Your password configuration does not meet the necessary platform security complexity requirements.",
                icon: "warning",
                confirmButtonColor: "#515def",
                customClass: { popup: 'rounded-2xl' }
            });
            return;
        }

        const body = {
            name: name.trim(),
            email: email.trim(),
            password: password,
        };

        const { status, user, message } = await handleSubmit("/register", body);

        if (status === 201) {
            Swal.fire({
                title: "Success!",
                text: "User registered successfully! Please check your inbox and verify your email.",
                icon: "success",
                confirmButtonColor: "#515def",
                customClass: {
                    popup: 'rounded-2xl',
                    confirmButton: 'rounded-xl px-5 py-2.5 font-semibold'
                }
            });

            console.log("Registered User:", user);
            
            // Clear inputs safely via state channels
            setName("");
            setEmail("");
            setPassword("");
            setShowPassword(false);
        } else {
            Swal.fire({
                title: "Error!",
                text: message || "Registration failed. Please try again.",
                icon: "error",
                confirmButtonColor: "#515def",
                customClass: {
                    popup: 'rounded-2xl'
                }
            });
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#fafafa] p-6 sm:p-10 select-none">
            <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-100/50">
                <div className="w-full space-y-6">
                    
                    {/* Header Section */}
                    <div className="space-y-2 text-center">
                        <h3 className="text-4xl font-extrabold tracking-tight text-gray-900">
                            Create Account
                        </h3>
                        <p className="text-sm font-medium text-gray-500 max-w-[280px] mx-auto">
                            Let's get you all set up so you can access your personal account.
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form className="space-y-4" onSubmit={handleRegister} autoComplete="off">
                        
                        {/* Name Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-[54px] bg-gray-50/50 border border-gray-200 rounded-xl outline-none pl-4 text-base text-gray-800 placeholder-gray-400 focus:border-[#515def] focus:bg-white focus:ring-4 focus:ring-indigo-50/70 transition-all duration-200"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-[54px] bg-gray-50/50 border border-gray-200 rounded-xl outline-none pl-4 text-base text-gray-800 placeholder-gray-400 focus:border-[#515def] focus:bg-white focus:ring-4 focus:ring-indigo-50/70 transition-all duration-200"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        {/* Password Field with Validation Indicators */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">Password</label>
                            <div className="relative w-full flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full h-[54px] bg-gray-50/50 border rounded-xl outline-none pl-4 pr-12 text-base text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-4 transition-all duration-200 ${
                                        password.length === 0 
                                            ? "border-gray-200 focus:border-[#515def] focus:ring-indigo-50/70" 
                                            : isPasswordValid 
                                            ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-50" 
                                            : "border-amber-200 focus:border-amber-500 focus:ring-amber-50"
                                    }`}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-gray-400 hover:text-[#515def] focus:outline-none transition-colors p-1"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaRegEyeSlash size="1.25rem" /> : <FaRegEye size="1.25rem" />}
                                </button>
                            </div>

                            {/* DYNAMIC PASSWORD SPECIFICATION REQUIREMENTS DESCRIPTION LINK */}
                            <div className="p-3 bg-gray-50/70 rounded-xl border border-gray-100/60 mt-1.5 space-y-1.5">
                                <p className="text-[11px] font-black tracking-wider uppercase text-gray-400 block mb-1">
                                    Security Rules Checklist:
                                </p>
                                
                                <div className="grid grid-cols-1 gap-1 text-xs font-semibold">
                                    {/* Rule 1: 8 Characters minimum length threshold */}
                                    <div className={`flex items-center gap-2 transition-colors duration-200 ${hasMinLength ? "text-emerald-600" : "text-gray-400"}`}>
                                        {hasMinLength ? <FaCheck size="0.7rem" className="text-emerald-500" /> : <FaTimes size="0.7rem" className="text-gray-300" />}
                                        <span>At least 8 alpha-numeric characters</span>
                                    </div>
                                    
                                    {/* Rule 2: Contains at least one base integer */}
                                    <div className={`flex items-center gap-2 transition-colors duration-200 ${hasNumber ? "text-emerald-600" : "text-gray-400"}`}>
                                        {hasNumber ? <FaCheck size="0.7rem" className="text-emerald-500" /> : <FaTimes size="0.7rem" className="text-gray-300" />}
                                        <span>At least one number (0-9)</span>
                                    </div>
                                    
                                    {/* Rule 3: Contains special glyph anchor character symbols */}
                                    <div className={`flex items-center gap-2 transition-colors duration-200 ${hasSpecialChar ? "text-emerald-600" : "text-gray-400"}`}>
                                        {hasSpecialChar ? <FaCheck size="0.7rem" className="text-emerald-500" /> : <FaTimes size="0.7rem" className="text-gray-300" />}
                                        <span>At least one special symbol character</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isPasswordValid && password.length > 0}
                            className={`w-full h-[54px] text-white font-semibold rounded-xl transition-all duration-200 mt-2 flex items-center justify-center text-base ${
                                !isPasswordValid && password.length > 0
                                    ? "bg-gray-300 cursor-not-allowed shadow-none"
                                    : "bg-[#515def] hover:bg-[#434fc4] active:scale-[0.98] shadow-md shadow-indigo-100 hover:shadow-lg"
                            }`}
                        >
                            Get Started
                        </button>
                    </form>

                    {/* Form Footer */}
                    <div className="pt-2 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#515def] font-bold hover:underline transition-all"
                            >
                                Login
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;