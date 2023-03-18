
import {type Response, type Request} from 'express';
import {type Category, type Body, type Clothe} from 'src/types';
let clothes: Clothe[] = [];

type BodyReq = {
	image: string | undefined;
	category: Category;
	body: Body;
};

const generateId = () => Math.random().toString(36).substring(2, 10);

function getAllClothes(_req: Request, res: Response): void {
	res.status(200).send(clothes);
}

function setNewCloth(req: Request, res: Response): void {
	const {category, body} = req.body as BodyReq;
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
	const response = clothes.filter(e => e.id === id);
	res.send(response[0]);
}

function setFavorite(req: Request, res: Response): void {
	const {id} = req.params;
	const result = clothes.filter(clothe => clothe.id === id);
	if (result.length === 1) {
		const clothe = result[0];
		const newClothe = {...clothe, favorite: !clothe.favorite};
		const updatedClothes = clothes.map(clothe => {
			const newClothes = clothe.id === id ? newClothe : clothe;
			return newClothes;
		});
		clothes = updatedClothes;
		res.send(newClothe);
	} else {
		res.send('error');
	}
}

export {
	getAllClothes,
	setFavorite,
	setNewCloth,
};
