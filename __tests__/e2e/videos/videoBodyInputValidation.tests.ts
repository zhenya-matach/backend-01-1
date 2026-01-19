import request from 'supertest';
import express from 'express';
import {setupApp} from "../../../src/setup-app";
import {availableResolutions} from "../../../src/db/types/video";
import {HttpStatus} from "../../../src/core/types/httpStatutes";
import {CreateVideoInputDto} from "../../../src/videos/dto/createVideoInputDto";
import {UpdateVideoInputDto} from "../../../src/videos/dto/updateVideoInputDto";

describe('Video API body validation check', () => {
    const app = express();
    setupApp(app);

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
            .expect(HttpStatus.NoContent_204);
    });

    const correctCreateVideoData: CreateVideoInputDto = {
        title: 'homework_3',
        author: 'Aliaksander_Hrechny',
        availableResolutions: [availableResolutions.P360],
    };

    it('should not create video when incorrect body passed; POST /videos', async () => {
        const invalidCreateDataSet1 = await request(app)
            .post('/videos')
            .send({
                ...correctCreateVideoData,
                title: '   ',
                author: '    ',
                availableResolutions: '  ',
            })
            .expect(HttpStatus.BadRequest_400);
        expect(invalidCreateDataSet1.body.errorsMessages).toHaveLength(3);

        const invalidCreateDataSet2 = await request(app)
            .post('/videos')
            .send({
                ...correctCreateVideoData,
                author: false,
                availableResolutions: 'P240',
            })
            .expect(HttpStatus.BadRequest_400);
        expect(invalidCreateDataSet2.body.errorsMessages).toHaveLength(2);

        const invalidCreateDataSet3 = await request(app)
            .post('/videos')
            .send({
                ...correctCreateVideoData,
                title: 'FlowersFlowersFlowersFlowersFlowersFlowersFlowers',
                author: 'kkkkkkkkkkkkkkkkkkkkk',
            })
            .expect(HttpStatus.BadRequest_400)
        expect(invalidCreateDataSet3.body.errorsMessages).toHaveLength(2);

        const videoListResponse = await request(app).get('/videos');
        expect(videoListResponse.body).toHaveLength(0);
    });

    const correctUpdateVideoData: UpdateVideoInputDto = {
        title: 'homework_4',
        author: 'Yauheni_Matach',
        availableResolutions: [availableResolutions.P720],
        canBeDownloaded: true,
        minAgeRestriction: 16,
        publicationDate: '2026-01-20T11:13:02.161Z',
    };

    it('should not update video when incorrect body passed; PUT /videos', async () => {
        await request(app)
            .post('/videos')
            .send({
                ...correctCreateVideoData
            })
            .expect(HttpStatus.Created_201);

        const createdVideo = await request(app).get('/videos');
        expect(createdVideo.body).toHaveLength(1);

        const invalidUpdateDataSet1 = await request(app)
            .put('/videos/' + createdVideo.body.id)
            .send({
                ...correctUpdateVideoData,
                author: 18,
                minAgeRestriction: 21,
            })
            .expect(HttpStatus.BadRequest_400);
        expect(invalidUpdateDataSet1.body.errorsMessages).toHaveLength(2);

        const invalidUpdateDataSet2 = await request(app)
            .put('/videos/' + createdVideo.body.id)
            .send({
                ...correctUpdateVideoData,
                availableResolutions: 'P720',
                canBeDownloaded: 'false',
                minAgeRestriction: 0,
                publicationDate: '2026-01-20',
            })
            .expect(HttpStatus.BadRequest_400);
        expect(invalidUpdateDataSet2.body.errorsMessages).toHaveLength(4);

        const invalidUpdateDataSet3 = await request(app)
            .put('/videos/' + createdVideo.body.id)
            .send({
                ...correctUpdateVideoData,
                title: '',
                author: '',
                canBeDownloaded: 77,
                minAgeRestriction: '16',
                publicationDate: '2026-01-20T11:13',
            })
            .expect(HttpStatus.BadRequest_400);
        expect(invalidUpdateDataSet3.body.errorsMessages).toHaveLength(5);
    });
});