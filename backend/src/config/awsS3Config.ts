/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/object-curly-spacing */
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

const { AWS_DEFAULT_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
	process.env;

const credentials = {
	accessKeyId: AWS_ACCESS_KEY_ID ?? '',
	secretAccessKey: AWS_SECRET_ACCESS_KEY ?? '',
};

const s3Client = new S3Client({
	region: AWS_DEFAULT_REGION ?? '',
	credentials,
});

export { s3Client };
