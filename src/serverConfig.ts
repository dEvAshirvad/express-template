import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userDeserializer from "./middlewares/userDeserializer";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./modules";
import { xApiValidator } from "./middlewares/authenticate";

const allowedOrigins = ["http://localhost:3000"];

export function serverConfig(app: Express) {
	app.use(cookieParser());
	app.use(express.urlencoded({ extended: true, limit: "2048mb" }));
	app.use(express.json({ limit: "2048mb" }));
	app.use(
		cors({
			credentials: true,
			origin: function (origin, callback) {
				// Check if the request origin is in the allowed origins list
				if (!origin || allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					callback(new Error("Not allowed by CORS"));
				}
			},
		})
	);

	app.use((req, res, next) => {
		res.cookie("lang", "en");
		next();
	});

	app.get("/health", (req, res) => {
		res.status(200).json({
			message: "Api server is nominal!!",
		});
	});

	app.use(xApiValidator);
	app.use(userDeserializer);
	app.use(router);
	app.use(errorHandler);
}
