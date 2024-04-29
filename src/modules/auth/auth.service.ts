import { Document } from "mongodb";
import { db } from "../../configs/DB";
import { APIError } from "../../errors/APIError";
import USER_ERRORS from "../../errors/userAuthError";
import { compareWithSalt, generateSaltAndHash } from "../../lib/hasher";

export class AuthServices {
	public static async authVerifier(
		email: string,
		password: string,
		collection: string
	) {
		if (!email || !password) {
			throw new APIError(USER_ERRORS.INVALID_CREDENTIALS);
		}
		const existingUser = await db.collection(collection).findOne({ email });
		if (existingUser) {
			throw new APIError(USER_ERRORS.USER_ALREADY_EXISTS);
		}
		try {
			// Hashing
			const { salt, hash } = await generateSaltAndHash(password);
			return {
				email,
				salt,
				hash,
				loginAttempts: 0,
			};
		} catch (error) {
			throw error;
		}
	}
	public static async login(
		email: string,
		password: string,
		collection: string
	) {
		if (!email || !password) {
			throw new APIError(USER_ERRORS.INVALID_CREDENTIALS);
		}
		const existingUser = await db.collection(collection).findOne({ email });
		if (!existingUser) {
			throw new APIError(USER_ERRORS.USER_NOT_FOUND_ERROR);
		}

		try {
			const compare = await compareWithSalt(
				password,
				existingUser.salt,
				existingUser.hash
			);
			if (!compare) {
				throw new APIError(USER_ERRORS.WRONG_PASSWORD);
			}

			return existingUser;
		} catch (error) {
			throw error;
		}
	}
}
