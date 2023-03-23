/* eslint-disable @typescript-eslint/object-curly-spacing */
import express from 'express';

import {
	backgroundRemove,
	upLoadBackgroundRemove,
} from 'src/controller/backgroundRemove';
import {
	getAllClothes,
	setFavorite,
	setNewCloth,
} from 'src/controller/looksControllers';
import { bgremove, uploadLocalOrBucket } from 'src/middleware/multerMiddleware';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/clothes', getAllClothes);
router.put('/clothes/:id', setFavorite);
router.post('/upload', uploadLocalOrBucket.single('image'), setNewCloth);
// Router.delete('/delete/:id');
router.post('/bgrm', bgremove.single('image'), backgroundRemove);
router.post('/uploadbg', upLoadBackgroundRemove);

export { router };
