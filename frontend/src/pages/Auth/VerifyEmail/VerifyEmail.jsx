import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../../AuthContext/AuthContext";
import { HiOutlineMailOpen } from "react-icons/hi"; // Professional email envelope icon
import Swal from "sweetalert2";

const VerifyEmail = () => {
    const { token } = useParams();
    const { handleSubmit } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleVerifyEmail = async (e) => {
        e.preventDefault();

        const { status, message } = await handleSubmit(
            `/verify-email/${token}`,
            {}
        );

        if (status === 200) {
            await Swal.fire({
                title: "Success!",
                text: message || "Your email has been verified successfully.",
                icon: "success",
                confirmButtonColor: "#515def",
                customClass: {
                    popup: 'rounded-2xl',
                    confirmButton: 'rounded-xl px-5 py-2.5 font-semibold'
                }
            });

            // Redirect to Login page
            navigate("/login");
        } else {
            Swal.fire({
                title: "Verification Failed",
                text: message || "The verification link may be invalid or expired.",
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
                <div className="w-full space-y-6 flex flex-col items-center text-center">

                    {/* Animated Icon Header */}
                    <div className="w-16 h-16 bg-indigo-50 text-[#515def] rounded-2xl flex items-center justify-center shadow-inner mt-2">
                        <HiOutlineMailOpen size="2.2rem" />
                    </div>

                    {/* Header Section */}
                    <div className="space-y-2">
                        <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">
                            Verify Your Email
                        </h3>
                        <p className="text-sm font-medium text-gray-500 max-w-[280px] mx-auto">
                            You're almost there! Click the confirmation button below to secure your profile access.
                        </p>
                    </div>

                    {/* Action Form */}
                    <form className="w-full pt-2" onSubmit={handleVerifyEmail}>
                        <button
                            type="submit"
                            className="w-full h-[54px] bg-[#515def] hover:bg-[#434fc4] active:scale-[0.98] text-white font-semibold rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 flex items-center justify-center text-base"
                        >
                            Confirm Email Address
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;