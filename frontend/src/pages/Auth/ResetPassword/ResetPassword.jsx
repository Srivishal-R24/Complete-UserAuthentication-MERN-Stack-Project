import { useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import AuthContext from "../../../AuthContext/AuthContext";
import Swal from "sweetalert2";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCreatePassword, setShowCreatePassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { token } = useParams();
    const navigate = useNavigate();
    const { handleSubmit } = useContext(AuthContext);

    // Strips out spaces entirely to guarantee a perfect matching comparison string
    const cleanPassword = password.replace(/\s/g, "");
    const cleanConfirmPassword = confirmPassword.replace(/\s/g, "");
    
    const hasInput = password.length > 0 || confirmPassword.length > 0;
    const passwordsMatch = cleanPassword === cleanConfirmPassword && cleanPassword !== "";

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Hard-stop browser submission if they do not match
        if (!passwordsMatch) {
            Swal.fire({
                title: "Mismatched Fields",
                text: "Please verify that both entry password configurations match perfectly without any spaces.",
                icon: "error",
                confirmButtonColor: "#515def",
                customClass: { popup: 'rounded-2xl' }
            });
            return;
        }

        const body = { password: cleanPassword };

        try {
            const response = await handleSubmit(`/reset-password/${token}`, body);
            
            // Safeguard against different API response structures
            const status = response?.status;
            const message = response?.message;

            if (status === 200 || response?.success === true) {
                await Swal.fire({
                    title: "Success!",
                    text: message || "Your account password has been changed successfully.",
                    icon: "success",
                    confirmButtonColor: "#515def",
                    customClass: {
                        popup: 'rounded-2xl',
                        confirmButton: 'rounded-xl px-5 py-2.5 font-semibold'
                    }
                });

                setPassword("");
                setConfirmPassword("");
                setShowCreatePassword(false);
                setShowConfirmPassword(false);
                
                navigate("/login");
            } else {
                Swal.fire({
                    title: "Reset Failed",
                    text: message || "This reset link has expired or is invalid. Please request a new one.",
                    icon: "error",
                    confirmButtonColor: "#515def",
                    customClass: { popup: 'rounded-2xl' }
                });
            }
        } catch (error) {
            console.error("Reset password catch error:", error);
            Swal.fire({
                title: "Server Error",
                text: "Could not connect to authentication services.",
                icon: "error",
                confirmButtonColor: "#515def",
                customClass: { popup: 'rounded-2xl' }
            });
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f4f5f9] p-4 sm:p-10 select-none">
            <div className="max-w-4xl w-full bg-white rounded-[32px] shadow-2xl shadow-gray-200/80 overflow-hidden flex flex-col md:flex-row min-h-[580px]">
                
                {/* BRAND VISUAL PANEL (Left Pane) */}
                <div className="w-full md:w-1/2 bg-gradient-to-tr from-[#3b46cd] via-[#515def] to-[#7682ff] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl" />
                    
                    <div className="relative z-10">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                            Security Protocol
                        </span>
                    </div>

                    <div className="space-y-4 relative z-10 my-auto pt-10 md:pt-0">
                        <h2 className="text-4xl font-black tracking-tight leading-tight">
                            Protect Your <br />Digital Workspace.
                        </h2>
                        <p className="text-indigo-100 text-sm font-medium leading-relaxed max-w-xs">
                            Create a strong combination of characters to guard your platform dashboard resources.
                        </p>
                    </div>

                    <div className="text-xs text-indigo-200/80 font-medium relative z-10 pt-6 md:pt-0">
                        &copy; Auth System Inc. Secure Infrastructure Framework.
                    </div>
                </div>

                {/* INTERACTIVE FORM PANEL (Right Pane) */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
                    <div className="w-full space-y-6">
                        
                        {/* Title Header */}
                        <div className="space-y-1.5">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                                Reset Password
                            </h3>
                            <p className="text-sm font-semibold text-gray-400">
                                Enter your new access credential configurations below.
                            </p>
                        </div>

                        {/* Interactive Reset Input Fields */}
                        <form className="space-y-4" onSubmit={handleResetPassword} autoComplete="off">
                            
                            {/* Input 1: New Password */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 pl-1">
                                    New Password
                                </label>
                                <div className="relative w-full flex items-center">
                                    <input
                                        type={showCreatePassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password" // BLOCKS BROWSER CACHE INTERFERENCE
                                        className="w-full h-[52px] bg-gray-50 border border-gray-200 rounded-xl outline-none pl-4 pr-12 text-base text-gray-800 placeholder-gray-400 focus:border-[#515def] focus:bg-white focus:ring-4 focus:ring-indigo-50/60 transition-all duration-200"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCreatePassword(!showCreatePassword)}
                                        className="absolute right-4 text-gray-400 hover:text-[#515def] p-1 focus:outline-none transition-colors"
                                    >
                                        {showCreatePassword ? <FaRegEyeSlash size="1.2rem" /> : <FaRegEye size="1.2rem" />}
                                    </button>
                                </div>
                            </div>

                            {/* Input 2: Confirm Password */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between pl-1">
                                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">
                                        Confirm Password
                                    </label>
                                    
                                    {/* Controlled state live validation status tags */}
                                    {hasInput && (
                                        <span className={`inline-flex items-center gap-1 text-xs font-bold transition-all duration-300 ${passwordsMatch ? "text-emerald-500" : "text-rose-500"}`}>
                                            {passwordsMatch ? (
                                                <>
                                                    <FaCheckCircle className="animate-pulse" /> Keys Match
                                                </>
                                            ) : (
                                                <>
                                                    <FaTimesCircle /> Mismatch
                                                </>
                                            )}
                                        </span>
                                    )}
                                </div>

                                <div className="relative w-full flex items-center">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete="new-password" // BLOCKS BROWSER CACHE INTERFERENCE
                                        className={`w-full h-[52px] bg-gray-50 border rounded-xl outline-none pl-4 pr-12 text-base text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-4 transition-all duration-200 ${
                                            !hasInput 
                                                ? "border-gray-200 focus:border-[#515def] focus:ring-indigo-50/60" 
                                                : passwordsMatch 
                                                ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-50" 
                                                : "border-rose-200 focus:border-rose-400 focus:ring-rose-50"
                                        }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 text-gray-400 hover:text-[#515def] p-1 focus:outline-none transition-colors"
                                    >
                                        {showConfirmPassword ? <FaRegEyeSlash size="1.2rem" /> : <FaRegEye size="1.2rem" />}
                                    </button>
                                </div>
                            </div>

                            {/* Action Submission Trigger Button */}
                            <button
                                type="submit"
                                className="w-full h-[52px] bg-[#515def] hover:bg-[#434fc4] active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200/50 transition-all duration-200 mt-3 flex items-center justify-center text-base"
                            >
                                Save Changes
                            </button>
                        </form>

                        {/* Visual Step Return Navigation Footer */}
                        <div className="pt-2 text-center border-t border-gray-100">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-gray-400 hover:text-[#515def] transition-colors duration-200 group"
                            >
                                <BiArrowBack className="transform group-hover:-translate-x-1 transition-transform duration-200" size="1.1rem" />
                                <span>Return to Sign In</span>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResetPassword;