/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import { type Response, type Request } from 'express';
import { type Clothe, type Category, type Body } from 'src/@types';
import clothesModel from 'src/model/clothesModel';
import Users from 'src/model/schema/users';

type MulterFile = {
	key?: string;
};

type RequestClothe = {
	category: Category;
	body: Body;
};

const { IMAGE_ROUTE } = process.env;

async function getAllClothes(req: Request, res: Response) {
	const decodedId = Number(req.user.id);
	const headerId = Number(req.params.id);
	if (decodedId !== headerId) {
		res.status(400).json({
			error: true,
			message: 'Invalid token',
		});
		return;
	}

	await clothesModel.getAllClothes(decodedId, res);
}

async function setNewCloth(req: Request, res: Response) {
	const decodedId = Number(req.user.id);
	const headerId = Number(req.params.id);

	const reqData: RequestClothe = req.body;
	const { category, body } = reqData;
	const { key } = req.file as MulterFile;
	const filename = req.file?.filename;
	const url = `${IMAGE_ROUTE ?? 'http://localhost:3333/files'}/${
		filename ?? key
	}`;
	if (decodedId !== headerId) {
		res.status(400).json({
			error: true,
			message: 'Invalid token',
		});
		return;
	}

	const user = await Users.findByPk(decodedId);
	if (user) {
		const newClothe: Clothe = {
			key: filename ?? key ?? '',
			category,
			body,
			image: url,
			userId: decodedId,
		};
		await clothesModel.setNewCloth(newClothe, res);
	} else {
		res.status(200).json({
			error: true,
			message: 'User not exists',
		});
	}
}

async function toggleFavorite(req: Request, res: Response) {
	const decodedId = Number(req.user.id);
	const userId = Number(req.params.userId);
	const clotheId = Number(req.params.clotheId);
	if (decodedId !== userId) {
		res.status(400).json({
			error: true,
			message: 'Invalid token',
		});
		return;
	}

	await clothesModel.toggleFavorite(clotheId, decodedId, res);
}

const looksControllers = {
	getAllClothes,
	toggleFavorite,
	setNewCloth,
};

export default looksControllers;
