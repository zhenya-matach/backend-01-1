import express, { Express, Request, Response } from 'express';
import { HttpStatus } from './core/types/http-statutes';
import { db } from './db/in-memory.db';
import { Video } from './videos/types/video';

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get ('/', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send ("Hello World!");
    });

    app.get ('/videos', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send(db.videos);
    })

    app.get ('/videos/:id', (req: Request, res: Response) => {
        const video = db.videos.find((v) => v.id === +req.params.id);
        if (!video) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.status(HttpStatus.Ok).send(video);
    });

    //---------

    app.post('/videos', (req: Request, res: Response) => {
        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        db.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    });

    //---------

    app.put('/videos/:id', (req: Request, res:Response) => {
        
    })

    //---------

    app.delete('/testing/all-data', (req: Request, res: Response) => {
        db.videos = [];
        res.sendStatus(HttpStatus.NoContent);
    });

    //--------

    app.get
    return app;
};