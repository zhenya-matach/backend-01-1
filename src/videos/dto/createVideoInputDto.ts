import { availableResolutions } from '../../db/types/video';

export type createVideoInputDto = {
    title: string;
    author: string;
    availableResolutions: availableResolutions[];
}