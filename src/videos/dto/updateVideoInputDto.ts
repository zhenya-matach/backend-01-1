import { availableResolutions } from '../../db/types/video';

export type UpdateVideoInputDto = {
    title: string;
    author: string;
    availableResolutions: availableResolutions[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
}