const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// User Registration
const userRegistration = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            isVerified,
            resetPasswordToken,
            resetPasswordExpires,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists!",
            });
        }
        //hash passsword

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex')

        user = new User({
            name,
            email,
            password: hashPassword,
            isVerified,
            verificationToken,
            resetPasswordToken,
            resetPasswordExpires,
        });

        await user.save();
        // create verification link

        const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        //email content
        const emailContent = `
            <h2>Email verification</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}" target="_blank" >
                ${verificationLink}
            </a>
            <p>This link expires in 1 hour.</p>
        `;

        // send email

        await sendEmail(user.email,'verify your Email', emailContent);

        return res.status(201).json({
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error!",
        });
    }
};

// User Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email,
            },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "1h",
            }
        );

        return res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        }).status(200).json({
            message: "Login successfully",
            token,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error!",
        });
    }
};

// Forgot Password
// Forgot Password
const userPasswordForget = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found!",
            });
        }

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires =
            Date.now() + 3600000;

        await user.save();

        const resetLink =
    `http://localhost:5173/reset-password/${resetToken}`;

        const emailContent = `
            <h2>Password Reset Request</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">
                ${resetLink}
            </a>
            <p>This link expires in 1 hour.</p>
        `;

        await sendEmail(
            user.email,
            "Password Reset Request",
            emailContent
        );

        // Updated response to match your desired format
        return res.status(200).json({
            message: "Password reset email sent",
            resetToken: resetToken
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error!",
        });
    }
};

// Reset Password
const userPasswordReset = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return res.status(400).json({
                message:
                    "Invalid or expired reset token",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
            user
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error!",
        });
    }
};

const userVerifyEmail = async(req,res)=>{
    try{
        const{token}=req.params;
        //find user to verification token
        const user = await User.findOne({verificationToken: token});
        if(!user){
            return res.ststus(400).json({
                message:'Invalid or expired verification token'
            })
        };


        //mark user to verified
        user.isVerified = true,
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({
            message:'Email verified successfully',
            user
        });
    }catch(error){
        res.status(500).json({
            message:'Server error!'
        })

    }
}

const userLogout= async=(req,res)=>{
    try{
        res.clearCookie('token',
            {
                httpOnly:true,
                secure: false,
                samesite:'strict'
            }
        );

        res.status(200).json({
            message:'Logged out successfully'
        })
    }catch(error){
        res.status(500).json({
            message:'Server error!'
        })
    }

} 




module.exports = {
    userRegistration,
    userLogin,
    userPasswordForget,
    userPasswordReset,
    userVerifyEmail,
    userLogout,
};
