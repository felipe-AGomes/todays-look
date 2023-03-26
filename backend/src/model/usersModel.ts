/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import { type Response } from 'express';
import { type Login, type UserData } from 'src/@types';

import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import Users from './schema/users';

const { JWT_SECRETKEY } = process.env;

async function createUser(data: UserData, res: Response) {
	try {
		await Users.create(data);
		res.status(200).json({
			error: false,
			message: 'user created successfully',
		});
	} catch (err) {
		res.status(400).json({
			error: true,
			message: 'user not successfully registered',
		});
	}
}

async function getAllUsers(res: Response) {
	try {
		const users = await Users.findAll({
			attributes: ['id', 'name', 'email'],
		});
		res.status(200).json({
			error: false,
			users,
		});
	} catch {
		res.status(400).json({
			error: true,
			message: 'Error: to get all users',
		});
	}
}

async function userLogin(data: Login, res: Response) {
	try {
		const user = await Users.findOne({
			attributes: ['id', 'name', 'email', 'password'],
			where: {
				email: data.email,
			},
		});

		if (!user) {
			res.status(400).json({
				error: true,
				message: 'Email or password not registered',
			});
			return;
		}

		if (!(await bcrypt.compare(data.password, user.password))) {
			res.status(400).json({
				error: true,
				message: 'Email or password not registered',
			});
			return;
		}

		const token = JWT.sign(
			{ id: user.id, email: user.email },
			JWT_SECRETKEY ?? '',
			{
				expiresIn: '7d',
			}
		);

		res.status(200).json({
			error: false,
			message: 'Successfully loggin',
			token,
			userLogged: user.id,
			emailUser: user.email,
		});
	} catch {
		res.status(400).json({
			error: true,
			message: 'Error to send login',
		});
	}
}

const usersModel = {
	createUser,
	getAllUsers,
	userLogin,
};

export default usersModel;
