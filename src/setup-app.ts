import express, {Express, Request, Response} from 'express';
import {HttpStatus} from './core/types/httpStatutes';
import {db} from './db/videos/inMemory.db';
import {Video} from './db/types/video';
import {createVideoInputValidation} from "./videos/validation/createVideoInputValidation";
import {createErrorMessages} from "./core/utils/errorsCreator";
import {updateVideoInputValidation} from "./videos/validation/updateVideoInputValidation";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    app.get('/', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send("Hello World!");
    });

    app.get('/videos', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send(db.videos);
    })

    app.get('/videos/:id', (req: Request, res: Response) => {
        const id = +req.params.id;
        const video = db.videos.find((v) => v.id === id);

        if (!id) {
            res
                .status(HttpStatus.BadRequest)
                .send(
                    createErrorMessages([{field: 'id', message: 'Неверно указан ID'}])
                );
            return;
        }

        if (!video) {
            res
                .status(HttpStatus.NotFound)
                .send(
                    createErrorMessages([{field: 'id', message: 'Видео не найдено'}])
                );
            return;
        }
        res.status(HttpStatus.Ok).send(video);
    });

    //---------

    app.post('/videos', (req: Request, res: Response) => {
        const errors = createVideoInputValidation(req.body);

        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }

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

    app.put('/videos/:id', (req: Request, res: Response) => {

        const errors = updateVideoInputValidation(req.body);

        if (errors.length > 0) {
            res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
            return;
        }

        const index = db.videos.findIndex((v) => v.id === +req.params.id);
        const video = db.videos[index];
        const updatedVideo: Video = {
            id: video.id,
            title: req.body.title || video.title,
            author: req.body.author || video.author,
            canBeDownloaded: req.body.canBeDownloaded || video.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction || video.minAgeRestriction,
            createdAt: video.createdAt,
            publicationDate: req.body.publicationDate || video.publicationDate,
            availableResolutions: req.body.availableResolutions || video.availableResolutions
        };

        Object.assign(video, updatedVideo);
        res.sendStatus(HttpStatus.NoContent);
    });

    //---------

    app.delete('/videos/:id', (req: Request, res: Response) => {
        const index = db.videos.findIndex((v) => v.id === +req.params.id);
        if (index === -1) {
            res.sendStatus(HttpStatus.NotFound);
        }
        db.videos.splice(index, 1);
        res.sendStatus(HttpStatus.NoContent);
    });

    //---------

    app.delete('/testing/all-data', (req: Request, res: Response) => {
        db.videos = [];
        res.sendStatus(HttpStatus.NoContent);
    });

    return app;
};