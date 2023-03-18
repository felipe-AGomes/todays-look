import multer from 'multer';

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename(_req, file, callback) {
		const fileName = file.originalname.replace(' ', '_');

		callback(null, `${Date.now()}_${fileName}`);
	},
});

const upload = multer({storage});

export default upload;
