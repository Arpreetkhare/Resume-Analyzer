const express =require("express");
const resumeRouter = require("./src/routes/resume-Route");
const userRouter = require('./src/routes/user-Route');
const cors = require("cors");


const database = require("./src/config/database");

require('dotenv').config();
const uri = process.env.DB_uri;






const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;


app.use("/api/resume", resumeRouter);
app.use("/api/user", userRouter);




const startServer = async () => {
    try {
        // Attempt to connect to the database
        await database.connect(uri);

        // Start the Express server after DB connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Failed to start server:", error.message);
        process.exit(1); // Exit the process if DB connection fails
    }
};

// Initialize the server
startServer();