/* eslint-disable no-warning-comments */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import fs from 'fs';
import path from 'path';

import axios from 'axios';
import FormData from 'form-data';
import { type Request, type Response } from 'express';

import { type BodyReq } from 'src/@types';
import { clothes, generateId } from './clothesControllers';

// TODO: fix sending images without background to s3 bucket

export function backgroundRemove(req: Request, res: Response): void {
	const imagePath = `${path.resolve(
		__dirname,
		'..',
		'..',
		'uploads',
		'bgremove'
	)}/${req.file ? req.file?.filename : ''}`;
	const formData = new FormData();
	formData.append('size', 'auto');
	formData.append(
		'image_file',
		fs.createReadStream(imagePath),
		path.basename(imagePath)
	);

	axios({
		method: 'post',
		url: 'https://api.remove.bg/v1.0/removebg',
		data: formData,
		responseType: 'arraybuffer',
		headers: {
			...formData.getHeaders(),
			'X-Api-Key': 'szRHGWyZTBXZuxkh4kosSkUG',
		},
	})
		.then((response) => {
			const fileName = req.file?.filename ?? '';
			const imagePath = `${path.resolve(
				__dirname,
				'..',
				'..',
				'uploads',
				'clothes'
			)}/${fileName}`;
			if (response.status !== 200) {
				console.error('Error:', response.status, response.statusText);
				return;
			}

			fs.writeFileSync(imagePath, response.data);
			res.status(200).json({
				message: 'Background remove success',
				body: `http://localhost:3333/files/${fileName}`,
			});
		})
		.catch((error) => {
			console.error('Request failed:', error);
		});
}

export function upLoadBackgroundRemove(req: Request, res: Response): void {
	const { category, body, image } = req.body as BodyReq;
	const key = req.file ? req.file?.filename : '';
	const id = generateId();
	const newClothe = {
		id,
		key,
		category,
		body,
		image,
		favorite: false,
	};
	clothes.push(newClothe);
	res.status(200).json({
		message: 'Enviado com sucesso!',
		newClothe,
	});
}
