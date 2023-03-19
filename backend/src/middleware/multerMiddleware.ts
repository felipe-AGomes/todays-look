import multer from 'multer';

const uploadsConfig = multer.diskStorage({
	destination: 'uploads/clothes/',
	filename(_req, file, callback) {
		const fileName = file.originalname.replace(' ', '_');

		callback(null, `${Date.now()}_${fileName}`);
	},
});
const bgremoveConfig = multer.diskStorage({
	destination: 'uploads/bgremove/',
	filename(_req, file, callback) {
		const fileName = file.originalname.replace(' ', '_');

		callback(null, `${Date.now()}_${fileName}`);
	},
});

const uploads = multer({storage: uploadsConfig});
const bgremove = multer({storage: bgremoveConfig});

export {
	uploads,
	bgremove,
};
