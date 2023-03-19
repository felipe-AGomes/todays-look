/* eslint-disable @typescript-eslint/object-curly-spacing */
import { type Response, type Request } from 'express';

import { type Clothe, type BodyReq } from 'src/types';

let clothes: Clothe[] = [];

const generateId = () => Math.random().toString(36).substring(2, 10);

function getAllClothes(_req: Request, res: Response): void {
	res.status(200).send(clothes);
}

function setNewCloth(req: Request, res: Response): void {
	const { category, body } = req.body as BodyReq;
	const image = req.file?.filename;
	const url = `http://localhost:3333/files/${image ? image : ''}`;
	const id = generateId();
	clothes.push({
		id,
		category,
		body,
		image: url,
		favorite: false,
	});
	res.status(200).json({
		message: 'New clothe seted',
	});
}

function setFavorite(req: Request, res: Response): void {
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
		});
	} else {
		res.status(400).json({
			error: 'Favorite not seted',
		});
	}
}

export { getAllClothes, setFavorite, setNewCloth, generateId, clothes };
