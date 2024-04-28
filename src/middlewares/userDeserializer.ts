import { NextFunction, Request, Response } from "express";

import { config } from "dotenv";

import { APIError } from "../errors/APIError";
import { cookieConfig } from "../configs/cookieConfig";
import { verifyJWT, signJWT } from "../lib/jwt.util";

config({ path: `.env.${process.env.NODE_ENV}` });

async function userDeserializer(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { access_token, refresh_token } = req.cookies;
	if (!access_token && !refresh_token) {
		return next();
	}
	const { payload, expired } = verifyJWT(access_token);

	// For a valid access token
	if (payload) {
		// @ts-expect-error: User not authenticated, handling in middleware
		req.user = payload;
		return next();
	}

	// expired but valid access token
	const { payload: refresh, expired: refresh_expiry } =
		expired && refresh_token
			? verifyJWT(refresh_token)
			: { payload: null, expired: false };

	if (refresh_expiry) {
		next(
			new APIError({
				MESSAGE: "need to relogin because refresh token expired",
				STATUS: 401,
				TITLE: "NEED TO RELOGIN",
			})
		);
	}

	if (!refresh) {
		return next();
	}

	try {
		delete refresh.iat;
		delete refresh.exp;

		const newAccessToken = signJWT(refresh, "5m");

		res.cookie(
			"access_token",
			newAccessToken,
			cookieConfig({ maxAge: 300000 })
		);

		const { payload } = verifyJWT(newAccessToken);

		// @ts-expect-error: User not authenticated, handling in middleware
		req.user = payload;
	} catch (error) {
		console.log(error);
		return next(error);
	}

	return next();
}

export default userDeserializer;
