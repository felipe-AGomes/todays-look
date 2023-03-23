/* eslint-disable @typescript-eslint/object-curly-spacing */
import multer from 'multer';
import multerS3 from 'multer-s3';

import { s3Client } from './awsS3Config';

export const storageConfig = {
	localUpload: multer.diskStorage({
		destination: 'uploads/clothes/',
		filename(_req, file, callback) {
			const fileName = file.originalname.replace(' ', '_');

			callback(null, `${Date.now()}_${fileName}`);
		},
	}),
	bucketUpload: multerS3({
		s3: s3Client,
		bucket: 'todayslook',
		acl: 'public-read',
		key(_req, file, callback) {
			const fileName = file.originalname.replace(' ', '_');

			callback(null, `${Date.now()}_${fileName}`);
		},
		contentType: multerS3.AUTO_CONTENT_TYPE,
	}),
	bgremoveConfig: multer.diskStorage({
		destination: 'uploads/bgremove/',
		filename(_req, file, callback) {
			const fileName = file.originalname.replace(' ', '_');

			callback(null, `${Date.now()}_${fileName}`);
		},
	}),
};
