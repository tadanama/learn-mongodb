import express from "express";
import dotenv from "dotenv";

// Enable environment variables
dotenv.config();

// Instantiate express
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
