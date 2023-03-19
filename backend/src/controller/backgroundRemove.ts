/* eslint-disable @typescript-eslint/object-curly-spacing */
import fs from 'fs';
import path from 'path';

import axios from 'axios';
import FormData from 'form-data';
import { type AxiosResponse } from 'axios';
import { type Request, type Response } from 'express';

import { type BodyReq } from 'src/types';
import { clothes, generateId } from './looksControllers';

type RemoveBgResponse = {
	data: ArrayBuffer;
	status: number;
	statusText: string;
	headers: any;
	config: any;
	request?: any;
};

function backgroundRemove(req: Request, res: Response): void {
	const imagePath = `${path.resolve(__dirname, '..', '..', 'uploads', 'bgremove')}/${
		req.file ? req.file?.filename : ''
	}`;
	const formData = new FormData();
	formData.append('size', 'auto');
	formData.append('image_file', fs.createReadStream(imagePath), path.basename(imagePath));

	const removeBgResponse: Promise<AxiosResponse<RemoveBgResponse>> = axios({
		method: 'post',
		url: 'https://api.remove.bg/v1.0/removebg',
		data: formData,
		responseType: 'arraybuffer',
		headers: {
			...formData.getHeaders(),
			'X-Api-Key': 'szRHGWyZTBXZuxkh4kosSkUG',
		},
	});
	removeBgResponse
		.then((response) => {
			const fileName = req.file ? req.file.filename : '';
			const imagePath = `${path.resolve(__dirname, '..', '..', 'uploads', 'clothes')}/${fileName}`;
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

function upLoadBackgroundRemove(req: Request, res: Response): void {
	const { category, body, image } = req.body as BodyReq;
	const id = generateId();
	clothes.push({
		id,
		category,
		body,
		image,
		favorite: false,
	});
	res.status(200).json({
		message: 'Enviado com sucesso!',
	});
}

export { backgroundRemove, upLoadBackgroundRemove };
