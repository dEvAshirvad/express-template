import { format } from "date-fns";
import { Response } from "express";
const timestamp = new Date();

export const Respond = ({
	res,
	status,
	data = {},
}: {
	res: Response;
	status: number;
	data: any[] | Record<string, any>;
}) => {
	if (status === 200 || status === 201) {
		return res.status(status).json({
			data,
			success: true,
			status,
			timestamp: format(timestamp, "PPP p"),
		});
	}
	return res.status(status).json({
		data,
		success: false,
		status,
		timestamp: format(timestamp, "PPP p"),
	});
};
