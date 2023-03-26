/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import express from 'express';

import {
	backgroundRemove,
	upLoadBackgroundRemove,
} from 'src/controller/backgroundRemove';
import clothesControllers from 'src/controller/clothesControllers';
import userConstrollers from 'src/controller/usersControllers';
import { bgremove, uploadLocalOrBucket } from 'src/middleware/multerMiddleware';
import secureLogin from 'src/middleware/secureLogin';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/register', userConstrollers.registerUser);
router.post('/login', userConstrollers.userLogin);
router.get('/allUsers', userConstrollers.getAllUsers); // TODO: Configurar para apenas o admin acessar

router.get(
	'/users/:id/clothes',
	secureLogin.hasUserLogged,
	clothesControllers.getAllClothes
);
router.put(
	'/user/:userId/clothes/:clotheId',
	secureLogin.hasUserLogged,
	clothesControllers.toggleFavorite
);
router.post(
	'/users/:id/upload',
	secureLogin.hasUserLogged,
	uploadLocalOrBucket.single('image'),
	clothesControllers.setNewCloth
);
// Router.delete('/delete/:id');
// router.post(
// 	'/bgrm',
// 	secureLogin.hasUserLogged,
// 	bgremove.single('image'),
// 	backgroundRemove
// );
// router.post('/uploadbg', secureLogin.hasUserLogged, upLoadBackgroundRemove);

export { router };
