/* eslint-disable @typescript-eslint/object-curly-spacing */
import { type NextFunction, type Request, type Response } from 'express';
import { type Login, type Register } from 'src/@types';

import bcrypt from 'bcrypt';

import usersModel from 'src/model/usersModel';

async function registerUser(req: Request, res: Response) {
	const data = req.body as Register;
	data.password = await bcrypt.hash(data.password, 8);
	await usersModel.createUser(data, res);
}

async function getAllUsers(_req: Request, res: Response) {
	await usersModel.getAllUsers(res);
}

async function userLogin(req: Request, res: Response, next: NextFunction) {
	const userData = req.body as Login;
	await usersModel.userLogin(userData, res);
}

const usersControllers = {
	registerUser,
	getAllUsers,
	userLogin,
};

export default usersControllers;
