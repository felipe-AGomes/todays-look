/* eslint-disable @typescript-eslint/object-curly-spacing */
import path from 'path';

import cors from 'cors';
import express from 'express';

import { router } from './router/routes';
import User from './model/schema/users';
import Clothes from './model/schema/clothes';

const uploadsPath = path.resolve(__dirname, '..', 'uploads', 'clothes');
const app = express();

const user = User;
const clothes = Clothes;

app.use(express.json());
app.use('/files', express.static(uploadsPath));
app.use(cors());
app.use(router);

export default app;
