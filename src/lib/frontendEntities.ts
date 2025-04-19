import type { Author, IDObject } from '$lib/index';

export interface PresentationCardData extends IDObject {
    documentId: string;
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