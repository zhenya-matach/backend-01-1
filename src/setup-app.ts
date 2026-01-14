import express, { Express, Request, Response } from 'express';
import { HttpStatus } from './core/types/httpStatutes';
import { db } from './db/videos/inMemory.db';
import { Video } from './db/types/video';

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
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 86400000).toISOString(),
            availableResolutions: req.body.availableResolutions
        };
        db.videos.push(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    });

    //---------

    app.put('/videos/:id', (req: Request, res:Response) => {
        const index = db.videos.findIndex((v) => v.id === +req.params.id);
        const video = db.videos[index];
        video.title = req.body.title;
        video.author = req.body.author;
        video.availableResolutions = req.body.availableResolutions;
        video.canBeDownloaded = req.body.canBeDownloaded;
        video.minAgeRestriction = req.body.minAgeRestriction;
        video.publicationDate = new Date().toISOString();

        res.sendStatus(HttpStatus.NoContent);
    });

    //---------

    app.delete('/videos/:id', (req: Request, res: Response) => {
        const index = db.videos.findIndex((v) => v.id === +req.params.id);
        db.videos.splice(index, 1);
        res.sendStatus(HttpStatus.NoContent);
    });

    //---------

    app.delete('/testing/all-data', (req: Request, res: Response) => {
        db.videos = [];
        res.sendStatus(HttpStatus.NoContent);
    });

    //--------

    return app;
};