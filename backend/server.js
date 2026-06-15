// Ensure dotenv runs first thing so all process.env variables are readable
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import database connection
const database = require("./config/database");

const app = express();

// Connect Database
database();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders:[
        "content-Type",
        "Authorization"
        
    ]
}));
app.use(cookieParser());

// Application routes
const authRouter = require("./routes/authRoutes");
app.use('/api/v1/auth', authRouter);

// Listening
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});