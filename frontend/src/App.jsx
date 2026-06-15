import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ForgetPassword from "./pages/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                {/* * The root path "/" has been changed to <Register />.
                  * Now, running your server on localhost instantly displays the register page first!
                  */}
                <Route path="/" element={<Register />} />

                {/* Relocated your home description view onto its own route path */}
                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/forget-password"
                    element={<ForgetPassword />}
                />

                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />

                <Route
                    path="/verify-email/:token"
                    element={<VerifyEmail />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;