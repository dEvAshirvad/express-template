import { APIError } from "../errors/APIError";
import USER_ERRORS from "../errors/userAuthError";

import bcrypt from "bcrypt";

// Function to generate a separate salt and hash from a plaintext password
export async function generateSaltAndHash(password: string) {
	const saltRounds = 10; // The number of rounds to generate the salt
	const salt = await bcrypt.genSalt(saltRounds); // Generate the salt
	const hash = await bcrypt.hash(password, salt); // Create a hash using the generated salt
	return { salt, hash };
}

// Function to hash a plaintext password using a given salt
export async function hashWithSalt(password: string, salt: string) {
	const hash = await bcrypt.hash(password, salt); // Hash the password with the provided salt
	return hash;
}

// Function to compare a plaintext password with a given salt and hash
export async function compareWithSalt(
	plaintextPassword: string,
	salt: string,
	storedHash: string
) {
	if (!salt || !storedHash) {
		throw new APIError(USER_ERRORS.INVALID_CREDENTIALS);
	}
	const computedHash = await hashWithSalt(plaintextPassword, salt); // Compute the hash with the given salt
	return computedHash === storedHash; // Check if the computed hash matches the stored hash
}
