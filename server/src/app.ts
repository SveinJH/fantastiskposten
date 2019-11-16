import { Request, Response, NextFunction } from 'express';

const express = require('express');

const articleRouter = require('./routes/articleRoutes');

const app = express();

// 1) MIDDLEWARES

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Hello from the middleware :)');
    next();
});

// 3) ROUTES
app.use('/api/v1/articles', articleRouter);

module.exports = app;
