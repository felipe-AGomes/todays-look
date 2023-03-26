/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import { type NextFunction, type Request, type Response } from 'express';
import JWT from 'jsonwebtoken';
import { promisify } from 'util';

type RequestUser = {
	user: {
		id: number;
		email: string;
	};
} & Request;

const { JWT_SECRETKEY } = process.env;

async function hasUserLogged(
	req: RequestUser,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(400).json({
			error: true,
			message: 'Token not send',
		});
		return;
	}

	const token = authorization.split(' ')[1];

	try {
		const decode = await promisify<string, JWT.JwtPayload>(JWT.verify)(
			token,
			JWT_SECRETKEY
		);
		req.user = {
			id: decode.id as number,
			email: decode.email as string,
		};

		next();
	} catch {
		res.status(400).json({
			error: true,
			message: 'Invalid token',
		});
	}
}

const secureLogin = {
	hasUserLogged,
};

export default secureLogin;
