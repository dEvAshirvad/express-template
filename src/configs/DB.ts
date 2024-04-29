import { config } from "dotenv";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

config({ path: `.env.${process.env.NODE_ENV}` });

const DB_URL = process.env.DB_URL as string;

export const client = new MongoClient(DB_URL);
export const db = client.db();

export default function () {
	return new Promise((resolve, reject) => {
		client.connect().catch((error) => {
			reject(error);
		});
		mongoose.set("strictQuery", false);
		mongoose
			.connect(DB_URL)

			.then(() => {
				resolve("Successfully connected to database");
			})
			.catch((error) => {
				reject(error);
			});
	});
}
