const mongoose = require("mongoose");

const database = async () => {
    try {
        const db_uri = process.env.DB_URI.replace(
            "<db_password>",
            process.env.DB_USER_PASS
        );

        await mongoose.connect(db_uri);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = database;