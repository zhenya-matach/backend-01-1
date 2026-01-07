enum resolution {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160'
}

export const availableResolutions = [
    resolution.P144,
    resolution.P240,
    resolution.P360,
    resolution.P480,
    resolution.P720,
    resolution.P1080,
    resolution.P1440,
    resolution.P2160
]

export type Video = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: Date,
    publicationDate: Date
}