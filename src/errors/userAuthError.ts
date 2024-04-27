import { IServerError } from "./APIError";

type UserError = {
	[key: string]: IServerError;
};

const USER_ERRORS: UserError = {
	AUTHORIZATION_ERROR: {
		STATUS: 401,
		TITLE: "AUTHORIZATION_ERROR",
		MESSAGE: "The user is not authorized to perform this action.",
	},
	INVALID_XAPI_KEY: {
		STATUS: 401,
		TITLE: "INVALID_XAPI_KEY",
		MESSAGE:
			"The user is not authorized to perform this action because of invalid x-api-key.",
	},
	USER_NOT_FOUND_ERROR: {
		STATUS: 404,
		TITLE: "USER_NOT_FOUND",
		MESSAGE: "The user was not found. Please try again later.",
	},
	OTP_NOT_VALID: {
		STATUS: 404,
		TITLE: "OTP_NOT_VALID",
		MESSAGE: "The otp you entered is not valid.",
	},
	SESSION_INVALIDATED: {
		STATUS: 404,
		TITLE: "SESSION_INVALIDATED",
		MESSAGE: "The session was invalidated. Please login again.",
	},
	ATTACHMENT_IN_USE: {
		STATUS: 400,
		TITLE: "ATTACHMENT_IN_USE",
		MESSAGE: "The requested attachment could not be deleted.",
	},
	USER_ALREADY_EXISTS: {
		STATUS: 400,
		TITLE: "USER_ALREADY_EXISTS",
		MESSAGE:
			"The user already exists. Please use a different email address or username",
	},
	INVALID_CREDENTIALS: {
		STATUS: 401,
		TITLE: "INVALID_CREDENTIALS",
		MESSAGE: "Invalid email or password. Please try again.",
	},
};

export default USER_ERRORS;
