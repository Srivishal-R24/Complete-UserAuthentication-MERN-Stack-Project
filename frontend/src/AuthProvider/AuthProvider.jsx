import AuthContext from "../AuthContext/AuthContext";
import useAxiosInstance from "../Hooks/useAxiosInstance";

const AuthProvider = ({ children }) => {
    const axiosInstance = useAxiosInstance();

    const handleSubmit = async (url, body) => {
        try {
            const res = await axiosInstance.post(url, body);

            return {
                status: res.status,
                user: res.data.user,
            };
        } catch (error) {
            console.error(error);

            return {
                status: error.response?.status,
                message:
                    error.response?.data?.message ||
                    error.message,
            };
        }
    };

    return (
        <AuthContext.Provider value={{ handleSubmit }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;