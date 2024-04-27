import jwt, { JwtPayload } from "jsonwebtoken";

// sign jwt
export function signJWT(
	payload: object,
	expiresIn: string | number,
	secret: string
) {
	return jwt.sign(payload, secret, { expiresIn });
}

// verify jwt
export function verifyJWT(
	token: string,
	secret: string
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
