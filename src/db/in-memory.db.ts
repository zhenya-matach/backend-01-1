import {Video, availableResolutions} from "../videos/types/video";

export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: 'homework_1',
            author: 'Yauheni_Matach',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString()
        },
        {
            id: 2,
            title: 'homework_2',
            author: 'Alexander_Hrechny',
            canBeDownloaded: false,
            minAgeRestriction: 16,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString()
        }
    ]
}