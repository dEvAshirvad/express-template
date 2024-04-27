import express from "express";
import dotenv from "dotenv";
import { serverConfig } from "./serverConfig";
import connectDB from "./configs/DB";
import { logger } from "./lib/logger";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const PORT = process.env.PORT || 3030;

serverConfig(app);

connectDB()
	.then(() => {
		logger.info("Running Status", "Database connected");
	})
	.catch((err) => {
		console.log("Database Connection Failed", err);
		process.exit();
	});

const server = app.listen(PORT, () => {
	logger.info(
		"Running Status",
		`Server started on port http://localhost:${PORT}`
	);
});

process.on("unhandledRejection", () => {
	// Logger.critical('Unhandled rejection', err);
	server.close(() => process.exit(1));
});
