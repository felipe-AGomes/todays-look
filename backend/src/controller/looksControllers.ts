/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import type aws from 'aws-sdk';
import dotenv from 'dotenv';

import { type Response, type Request } from 'express';
import { type Clothe, type BodyReq } from 'src/types';

dotenv.config();

type MulterFile = {
	key?: string;
};

const { IMAGE_ROUTE } = process.env;
export let clothes: Clothe[] = [];

export const generateId = () => Math.random().toString(36).substring(2, 10);

export function getAllClothes(_req: Request, res: Response): void {
	res.status(200).send(clothes);
}

export function setNewCloth(req: Request, res: Response): void {
	const { category, body } = req.body as BodyReq;
	const { key } = req.file as MulterFile;
	const filename = req.file?.filename;
	const url = `${IMAGE_ROUTE ?? 'http://localhost:3333/files'}/${
		filename ?? key
	}`;
	const id = generateId();
	const newClothe: Clothe = {
		id,
		key: filename ?? key ?? '',
		category,
		body,
		image: url,
		favorite: false,
	};
	clothes.push(newClothe);
	res.status(200).json({
		message: 'New clothe seted',
		newClothe,
	});
}

export function setFavorite(req: Request, res: Response): void {
	const { id } = req.params;
	const result = clothes.filter((clothe) => clothe.id === id);
	if (result.length === 1) {
		const clothe = result[0];
		const newClothe = { ...clothe, favorite: !clothe.favorite };
		const updatedClothes = clothes.map((clothe) => {
			const newClothes = clothe.id === id ? newClothe : clothe;
			return newClothes;
		});
		clothes = updatedClothes;
		res.status(200).json({
			message: 'Favorite seted',
			newClothe,
		});
	} else {
		res.status(400).json({
			error: 'Favorite not seted',
		});
	}
}
