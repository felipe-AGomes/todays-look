// Const express = require('express');
import express from 'express';
import {router} from './router/routes';
import cors from 'cors';
import path from 'path';

const uploadsPath = path.resolve(__dirname, '..', 'uploads');

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadsPath));
app.use(cors());
app.use(router);

export default app;
