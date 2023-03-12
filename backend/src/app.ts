// Const express = require('express');
import express from 'express';
import {router} from './router/routes';
import cors from 'cors';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(router);

export default app;
