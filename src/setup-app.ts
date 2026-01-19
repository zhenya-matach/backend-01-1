import express, {Express, Request, Response} from 'express';
import {HttpStatus} from './core/types/httpStatutes';
import {videosRouter} from "./videos/routers/videosRouter";
import {testingRouter} from "./testing/routers/testingRouter";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok_200).send("Hello World!");
    });

    app.use('/videos', videosRouter);

    app.use('/testing', testingRouter);

    return app;
};