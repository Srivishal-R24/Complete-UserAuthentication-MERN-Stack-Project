import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidLogInCircle, BiSolidUser } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { TbLayersIntersect } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";
import Swal from "sweetalert2";

import AuthContext from "../../AuthContext/AuthContext";

const Navbar = () => {
    const { handleSubmit } = useContext(AuthContext);
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleLogout = async () => {
        setDropdownOpen(false);

        const result = await handleSubmit("/logout", {});

        const { status, message } = result;

        if (status === 200) {
            await Swal.fire({
                title: message || "Logout Successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            localStorage.removeItem("user");

            navigate("/register");
        } else {
            Swal.fire({
                title: message || "Logout Failed",
                icon: "error",
                confirmButtonColor: "#515def",
            });
        }
    };

    return (
        <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <div className="w-11 h-11 bg-gradient-to-tr from-[#3b46cd] to-[#515def] text-white rounded-xl flex items-center justify-center shadow-md">
                        <TbLayersIntersect size="1.6rem" />
                    </div>

                    <div>
                        <h1 className="text-xl font-black text-gray-900">
                            Sri
                            <span className="text-[#515def]">
                                Auth
                            </span>
                        </h1>

                        <p className="text-[11px] font-bold text-gray-400 uppercase">
                            Secure Nexus Gateway
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-4">

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#515def]"
                            >
                                <BiSolidLogInCircle size={20} />

                                Sign In
                            </Link>

                            <Link
                                to="/register"
                                className="bg-[#515def] hover:bg-[#434fc4] text-white px-5 h-[44px] rounded-xl flex items-center gap-2 text-sm font-bold"
                            >
                                <BiSolidUser size={18} />

                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Top Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 h-[44px] rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all"
                            >
                                <IoMdLogOut size={20} />

                                Logout
                            </button>

                            {/* Profile Dropdown */}
                            <div
                                className="relative"
                                ref={dropdownRef}
                            >
                                <button
                                    onClick={() =>
                                        setDropdownOpen(
                                            !dropdownOpen
                                        )
                                    }
                                    className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-2xl"
                                >
                                    <div className="relative">
                                        <FaUserCircle
                                            size="2.4rem"
                                            className="text-gray-300"
                                        />

                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                                    </div>

                                    <div className="hidden sm:block text-left">
                                        <p className="font-bold text-sm text-gray-800">
                                            {user?.name}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {user?.email}
                                        </p>
                                    </div>

                                    <FiChevronDown
                                        size={16}
                                        className={`transition-transform ${
                                            dropdownOpen
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-2xl shadow-xl py-2 z-50">

                                        <div className="px-4 py-3 border-b">
                                            <p className="font-bold text-sm">
                                                {user?.name}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {user?.email}
                                            </p>
                                        </div>

                                        <button
                                            onClick={
                                                handleLogout
                                            }
                                            className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-500 font-bold text-sm flex items-center gap-3"
                                        >
                                            <IoMdLogOut
                                                size={20}
                                            />

                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;