import {Request, Response, Router} from "express";
import {HttpStatus} from "../../core/types/httpStatutes";
import {db} from "../../db/videos/inMemory.db";
import {createErrorMessages} from "../../core/utils/errorsCreator";
import {createVideoInputValidation} from "../validation/createVideoInputValidation";
import {Video} from "../../db/types/video";
import {updateVideoInputValidation} from "../validation/updateVideoInputValidation";


export const videosRouter = Router();

videosRouter
.get('', (req: Request, res: Response) => {
    res.status(HttpStatus.Ok_200).send(db.videos);
})

.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const video = db.videos.find((v) => v.id === id);

    if (!id) {
        res
            .status(HttpStatus.BadRequest_400)
            .send(
                createErrorMessages([{field: 'id', message: 'Неверно указан ID'}])
            );
        return;
    }

    if (!video) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{field: 'id', message: 'Видео не найдено'}])
            );
        return;
    }
    res.status(HttpStatus.Ok_200).send(video);
})

//---------

.post('', (req: Request, res: Response) => {
    const errors = createVideoInputValidation(req.body);

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest_400).send(createErrorMessages(errors));
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
    res.status(HttpStatus.Created_201).send(newVideo);
})

//---------

.put('/:id', (req: Request, res: Response) => {

    const errors = updateVideoInputValidation(req.body);

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest_400).send(createErrorMessages(errors));
        return;
    }

    const index = db.videos.findIndex((v) => v.id === +req.params.id);
    if (index === -1) {
        res.sendStatus(HttpStatus.NotFound_404);
    }

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
    res.sendStatus(HttpStatus.NoContent_204);
})

//---------

.delete('/:id', (req: Request, res: Response) => {
    const index = db.videos.findIndex((v) => v.id === +req.params.id);
    if (index === -1) {
        res.sendStatus(HttpStatus.NotFound_404);
    }
    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent_204);
});