import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import AuthContext from "../../../AuthContext/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
    // Migrated onto controlled component states to sync perfectly with state redirects
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { handleSubmit } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        const body = {
            email: email.trim(),
            password: password,
        };

        const { status, message } = await handleSubmit("/login", body);

        if (status === 200) {
            await Swal.fire({
                title: message || "Login Successful",
                icon: "success",
                confirmButtonColor: "#515def",
                customClass: {
                    popup: 'rounded-2xl',
                    confirmButton: 'rounded-xl px-5 py-2.5 font-semibold'
                }
            });

            console.log("User logged:", status, message);

            // Clean up state references safely
            setEmail("");
            setPassword("");
            setShowPassword(false);

            // * SUCCESS REDIRECT ROUTE CHANGE
            // * This redirects the user directly to your informational dashboard landing path!
            navigate("/home");
        } else {
            Swal.fire({
                title: message || "Invalid email or password",
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
                            Welcome Back
                        </h3>
                        <p className="text-sm font-medium text-gray-500 max-w-[280px] mx-auto">
                            Login to your account to manage your workspace entries.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-4" onSubmit={handleLogin} autoComplete="off">

                        {/* Email Input Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="username"
                                className="w-full h-[54px] bg-gray-50/50 border border-gray-200 rounded-xl outline-none pl-4 text-base text-gray-800 placeholder-gray-400 focus:border-[#515def] focus:bg-white focus:ring-4 focus:ring-indigo-50/70 transition-all duration-200"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        {/* Password Input Field with Visibility Toggle */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">
                                Password
                            </label>
                            <div className="relative w-full flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="w-full h-[54px] bg-gray-50/50 border border-gray-200 rounded-xl outline-none pl-4 pr-12 text-base text-gray-800 placeholder-gray-400 focus:border-[#515def] focus:bg-white focus:ring-4 focus:ring-indigo-50/70 transition-all duration-200"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-gray-400 hover:text-[#515def] focus:outline-none transition-colors p-1"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <FaRegEyeSlash size="1.25rem" />
                                    ) : (
                                        <FaRegEye size="1.25rem" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Utilities: Forget Password link */}
                        <div className="flex items-center justify-end pt-1">
                            <Link
                                to="/forget-password"
                                className="text-sm font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Action Button */}
                        <button
                            type="submit"
                            className="w-full h-[54px] bg-[#515def] hover:bg-[#434fc4] active:scale-[0.98] text-white font-semibold rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 mt-2 flex items-center justify-center text-base"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Form Alternate Option Redirect */}
                    <div className="pt-2 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#515def] font-bold hover:underline transition-all"
                            >
                                Please Register
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;