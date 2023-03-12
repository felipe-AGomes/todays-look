import express from 'express';
import {getAllClothes, setFavorite, setNewCloth} from 'src/controller/looksControllers';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/clothes', getAllClothes);
router.put('/clothes/:id', setFavorite);
router.post('/newclothe', setNewCloth);

export {
	router,
};
