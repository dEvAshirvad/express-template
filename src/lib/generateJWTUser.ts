import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface JWTUser {
	email: string;
	name: string;
	imageUrl: string;
	verified: string;
	roles: string[];
}

export function generateJWTUser({
	email,
	name,
	imageUrl,
	verified,
	roles,
}: JwtPayload): JWTUser {
	return {
		email,
		name,
		imageUrl,
		verified,
		roles,
	};
}
