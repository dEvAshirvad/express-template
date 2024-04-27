import { CookieOptions } from "express";

export function cookieConfig({
	maxAge,
	sameSite = "none",
	httpOnly = true,
	domain = process.env.NODE_ENV === "prod"
		? ".clashersacademy.com"
		: "localhost",
	secure = false,
}: CookieOptions): CookieOptions {
	return {
		maxAge,
		sameSite,
		httpOnly,
		domain,
		secure,
	};
}
