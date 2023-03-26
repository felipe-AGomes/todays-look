/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
import { type Model } from 'sequelize';

import Sequelize from 'sequelize';

import db from '../connect';
import Clothes from './clothes';

type UsersAttributes = {
	id: number;
	name: string;
	email: string;
	password: string;
} & Model;

const Users = db.define<UsersAttributes>('users', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

// Users.sync();

export default Users;
