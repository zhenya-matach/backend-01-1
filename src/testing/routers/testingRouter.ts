import {Request, Response, Router} from "express";
import {db} from "../../db/videos/inMemory.db";
import {HttpStatus} from "../../core/types/httpStatutes";

export const testingRouter = Router();
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    db.videos = [];
    res.sendStatus(HttpStatus.NoContent_204);
});