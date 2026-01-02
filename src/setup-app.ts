import express, {Express, Request, Response} from 'express';

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get ("/", (req: Request, res: Response) => {
        res.status(200).send ("Hello World!");
    });
    return app;
};