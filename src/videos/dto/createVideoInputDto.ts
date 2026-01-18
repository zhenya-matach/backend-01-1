import {availableResolutions} from '../../db/types/video';

export type CreateVideoInputDto = {
    title: string;
    author: string;
    availableResolutions: availableResolutions[];
}