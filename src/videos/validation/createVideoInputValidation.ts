import {createVideoInputDto} from "../dto/createVideoInputDto";
import {availableResolutions} from "../../db/types/video";
import {ValidationError} from "../types/validationError";

export const createVideoInputValidation = (data: createVideoInputDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.title) {
        errors.push({field: 'title', message: 'Title required'});
    } else if (typeof data.title !== 'string') {
        errors.push({field: 'title', message: 'Invalid data type'});
    } else if (data.title.trim().length > 40) {
        errors.push({field: 'title', message: 'Maximum length: 40 characters'});
    }

    if (!data.author) {
        errors.push({field: 'author', message: 'Author required'});
    } else if (typeof data.author !== 'string') {
        errors.push({field: 'author', message: 'Invalid data type'});
    } else if (data.author.trim().length > 20) {
        errors.push({field: 'author', message: 'Maximum length: 20 characters'});
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({field: 'availableResolutions', message: 'AvailableResolutions must be array'});
    } else if (!data.availableResolutions) {
        errors.push({field: 'availableResolutions', message: 'Value must be specified'});
    } else if (data.availableResolutions.length === 0) {
        errors.push({field: 'availableResolutions', message: 'The field cannot be empty'});
    } else if (data.availableResolutions.length) {
        const existingResolution = Object.values(availableResolutions);
        if (
            data.availableResolutions.length > existingResolution.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({field: 'availableResolutions', message: 'Invalid resolution'});
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolution.includes(resolution)) {
                errors.push({field: 'availableResolutions', message: 'Invalid resolution:' + resolution});
                break;
            }
        }
    }

    return errors;

}
