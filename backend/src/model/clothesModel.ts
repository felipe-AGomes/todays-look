/* eslint-disable @typescript-eslint/object-curly-spacing */
import { type Response } from 'express';
import { type Clothe } from 'src/@types';
import Clothes from './schema/clothes';
import Users from './schema/users';

async function setNewCloth(data: Clothe, res: Response) {
	try {
		await Clothes.create(data);
		res.status(200).json({
			error: false,
			message: 'clothes successfully created',
		});
	} catch {
		res.status(400).json({
			error: true,
			message: 'Error set a new clothe',
		});
	}
}

async function toggleFavorite(clotheId: number, userId: number, res: Response) {
	console.log(clotheId, userId);
	try {
		const clothe = await Clothes.findOne({ where: { userId, id: clotheId } });

		console.log('here 1');
		if (!clothe) {
			res.status(400).json({
				error: true,
				message: 'no clothes with past id found for this user',
			});
			return;
		}

		console.log('here 2');

		await clothe?.update({ favorite: !clothe.favorite });
		res.status(200).json({
			error: false,
			message: 'favorite status changed successfully',
		});
	} catch {
		res.status(400).json({
			erros: true,
			message: 'error when changing favorite status',
		});
	}
}

async function getAllClothes(id: number, res: Response) {
	try {
		const clothes = await Clothes.findAll({
			where: {
				userId: id,
			},
		});
		res.status(200).json({
			error: false,
			clothes,
		});
	} catch {
		res.status(400).json({
			error: true,
			message: 'Cannot find clothes',
		});
	}
}

const clothesModel = {
	setNewCloth,
	toggleFavorite,
	getAllClothes,
};

export default clothesModel;
