
import {type Response, type Request} from 'express';
import {type Category, type Body, type Clothe} from 'src/types';
let clothes: Clothe[] = [];

type BodyReq = {
	img: string;
	category: Category;
	body: Body;
};

const generateId = () => Math.random().toString(36).substring(2, 10);

function getAllClothes(_req: Request, res: Response): void {
	res.status(200).send(clothes);
}

function setNewCloth(req: Request, res: Response): void {
	const {img, category, body}: BodyReq = req.body as BodyReq;
	console.log({img, category, body});
}

function setFavorite(req: Request, res: Response): void {
	const {id} = req.params;
	const result = clothes.filter(clothe => clothe.id === id);
	if (result.length === 1) {
		const clothe = result[0];
		const newClothe = {...clothe, favorite: !clothe.favorite};
		const t = clothes.map(clothe => {
			const newClothes = clothe.id === id ? newClothe : clothe;
			return newClothes;
		});
		clothes = t;
		res.send(clothes);
	} else {
		res.send('error');
	}
}

export {
	getAllClothes,
	setFavorite,
	setNewCloth,
};
