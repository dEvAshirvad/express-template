import { config } from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
config({ path: `.env.${process.env.NODE_ENV}` });

// sign jwt
export function signJWT(
	payload: object,
	expiresIn: string | number,
	secret = process.env.TOKEN_SECRET as string
) {
	return jwt.sign(payload, secret, { expiresIn });
}

// verify jwt
export function verifyJWT(
	token: string,
	secret = process.env.TOKEN_SECRET as string
): { payload: JwtPayload | null; expired: boolean } {
	try {
		const decoded = jwt.verify(token, secret);
		if (typeof decoded === "string") {
			return { payload: null, expired: true };
		}
		return { payload: decoded, expired: false };
	} catch (error) {
		return { payload: null, expired: true };
	}
}
