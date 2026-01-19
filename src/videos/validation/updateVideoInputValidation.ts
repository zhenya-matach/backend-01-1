import {UpdateVideoInputDto} from '../dto/updateVideoInputDto';
import {availableResolutions} from "../../db/types/video";
import {ValidationError} from "../types/validationError";

export const updateVideoInputValidation = (data: UpdateVideoInputDto): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.title) {
        errors.push({field: 'title', message: 'Необходимо указать title'});
    } else if (typeof data.title !== 'string') {
        errors.push({field: 'title', message: 'Неверный тип данных'});
    } else if (data.title.trim().length > 40) {
        errors.push({field: 'title', message: 'Максимальная длина: 40 символов'});
    }

    if (!data.author) {
        errors.push({field: 'author', message: 'Необходимо указать author'});
    } else if (typeof data.author !== 'string') {
        errors.push({field: 'author', message: 'Неверный тип данных'});
    } else if (data.author.trim().length > 20) {
        errors.push({field: 'author', message: 'Максимальная длина: 20 символов'});
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({field: 'availableResolutions', message: 'AvailableResolutions должен быть массивом'});
    } else if (!data.availableResolutions) {
        errors.push({field: 'availableResolutions', message: 'Значение должно быть определено'});
    } else if (data.availableResolutions.length === 0) {
        errors.push({field: 'availableResolutions', message: 'Поле не может быть пустым'});
    } else if (data.availableResolutions.length) {
        const existingResolution = Object.values(availableResolutions);
        if (
            data.availableResolutions.length > existingResolution.length ||
            data.availableResolutions.length < 1
        ) {
            errors.push({field: 'availableResolutions', message: 'Неверное разрешение'});
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolution.includes(resolution)) {
                errors.push({field: 'availableResolutions', message: 'Неверное разрешение:' + resolution});
                break;
            }
        }
    }

    if (!data.canBeDownloaded) {
        errors.push({field: 'canBeDownloaded', message: 'Необходимо указать canBeDownloaded'})
    } else if (typeof data.canBeDownloaded !== 'boolean') {
        errors.push({field: 'canBeDownloaded', message: 'Неверный тип данных'})
    }

    if (typeof data.minAgeRestriction !== 'number') {
        errors.push({field: 'minAgeRestriction', message: 'Неверный тип данных'})
    } else if (data.minAgeRestriction < 1 || data.minAgeRestriction > 18) {
        errors.push({field: 'minAgeRestriction', message: 'Недопустимое значение'})
    }

    if (typeof data.publicationDate !== 'string') {
        errors.push({field: 'publicationDate', message: 'Неверный тип данных'});
    } else if (
        data.publicationDate.length < 24 ||
        !data.publicationDate.includes('-') ||
        !data.publicationDate.includes(':')
    ) {
        errors.push({field: 'publicationDate', message: 'Неверное значение'});
    }

    return errors;
}