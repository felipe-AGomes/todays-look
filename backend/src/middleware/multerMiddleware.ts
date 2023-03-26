/* eslint-disable @typescript-eslint/object-curly-spacing */

import multer from 'multer';
import { storageConfig } from 'src/config/multerConfig';

export const uploadLocalOrBucket = multer({
	storage:
		storageConfig.bucketUpload /* To dev storageConfig.localUpload or to deploy storageConfig.bucketUpload  */,
	limits: { fileSize: 24_000_000 },
	fileFilter(_req, file, callback) {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(new Error('Invalid file type'));
		}
	},
});

export const bgremove = multer({
	storage: storageConfig.bgremoveConfig,
	limits: { fileSize: 24_000_000 },
	fileFilter(_req, file, callback) {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(new Error('Invalid file type'));
		}
	},
});
