import express from 'express';
import {getAllClothes, setFavorite, setNewCloth} from 'src/controller/looksControllers';
import upload from 'src/middleware/multerMiddleware';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/clothes', getAllClothes);
router.put('/clothes/:id', setFavorite);
router.post('/upload', upload.single('image'), setNewCloth);

export {
	router,
};
