import type { Author, IDObject, Presentation } from '$lib/index';

export interface PresentationCardData extends IDObject {
    lectureNumber: number;
    name: string;
    description: string;
    presentationUrl: string;
    authors: Author[];
    commentsCount: number;
    /**
     * Average votes of all persons
     */
    averageUserScore?: number;
}

export const mapToPresentationCardData = (value: Presentation, index: number): PresentationCardData => ({
    lectureNumber: index + 1,
    name: value.presentationName,
    description: value.presentationDescription,
    presentationUrl: value.presentationUrl,
    authors: value.presentationOwners,
    commentsCount: value.comments.length,
    id: value.id
});