import express, {Express, Request, Response} from 'express';
import {HttpStatutes} from "./core/types/http-statutes";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get ("/", (req: Request, res: Response) => {
        res.status(200).send ("Hello World!");
    });

    //---------

    app.delete('/testing/all-data', (req: Request, res: Response) => {
        db.videos = [];
        res.sendStatus(HttpStatutes.NoContent);
    })
    return app;
};