import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../AuthContext/AuthContext";
import { BiArrowBack } from "react-icons/bi"; // FIXED: Corrected import package to match the "Bi" prefix
import Swal from "sweetalert2";

const ForgetPassword = () => {
    const findEmailRef = useRef(null); 
    const { handleSubmit } = useContext(AuthContext);

    const handleForget = async (e) => {
        e.preventDefault();

        const body = {
            email: findEmailRef.current.value,
        };

        const { status, message } = await handleSubmit("/forget-password", body);

        if (status === 200) {
            Swal.fire({
                title: "Email Sent!",
                text: message || "Password reset link has been dispatched to your inbox.",
                icon: "success",
                confirmButtonColor: "#515def",
                customClass: {
                    popup: 'rounded-2xl',
                    confirmButton: 'rounded-xl px-5 py-2.5 font-semibold'
                }
            });

            console.log("Forget password:", status, message);
            findEmailRef.current.value = "";
        } else {
            Swal.fire({
                title: "Error!",
                text: message || "Something went wrong. Please check your spelling and retry.",
                icon: "error",
                confirmButtonColor: "#515def",
                customClass: {
                    popup: 'rounded-2xl'
                }
            });
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#fafafa] p-6 sm:p-10">
            <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-100/50">
                <div className="w-full space-y-6">

                    {/* Header Section */}
                    <div className="space-y-2 text-center">
                        <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Forgot Password?
                        </h3>
                        <p className="text-sm font-medium text-gray-500 max-w-[320px] mx-auto">
                            Don't worry, it happens to all of us. Enter your email address to recover your account keys.
                        </p>
                    </div>

                    {/* Email Recovery Form */}
                    <form className="space-y-5" onSubmit={handleForget}>
                        
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 pl-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                ref={findEmailRef}
                                className="w-full h-[54px] bg-gray-50/50 border border-gray-200 rounded-xl outline-none pl-4 text-base text-gray-800 placeholder-gray-400 focus:border-[#515def] focus:bg-white focus:ring-4 focus:ring-indigo-50/70 transition-all duration-200"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        {/* Submit Request Button */}
                        <button
                            type="submit"
                            className="w-full h-[54px] bg-[#515def] hover:bg-[#434fc4] active:scale-[0.98] text-white font-semibold rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 mt-2 flex items-center justify-center text-base"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    {/* Navigation Escape Footer */}
                    <div className="pt-2 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#515def] transition-colors duration-200 group"
                        >
                            {/* FIXED: Added the imported icon with an interactive animated slide shift effect on hover */}
                            <BiArrowBack className="transform group-hover:-translate-x-1 transition-transform" size="1.1rem" />
                            <span>Back to Sign In</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;