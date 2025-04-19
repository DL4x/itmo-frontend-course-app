import type { Author, IDObject } from '$lib/index';

export interface PresentationCardData extends IDObject {
	lectureNumber: number;
	presentationName: string;
	presentationDescription: string;
	presentationUrl: string;
	authors: Author[];
	commentsCount: number;
	/**
	 * Average votes of all persons
	 */
	averageUserScore?: number;
}