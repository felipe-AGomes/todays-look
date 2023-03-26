/* eslint-disable @typescript-eslint/object-curly-spacing */
/* eslint-disable @typescript-eslint/naming-convention */

import Sequelize from 'sequelize';
import { type Model } from 'sequelize';

import Users from './users';
import db from '../connect';

type ClothesAttributes = {
	id: number;
	category: string;
	body: string;
	favorite: boolean;
	image: string;
	key: string;
} & Model;

const Clothes = db.define<ClothesAttributes>('clothes', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	body: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	favorite: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
	key: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	image: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		references: {
			model: Users,
			key: 'id',
		},
	},
});

// Clothes.sync();

export default Clothes;
