import type { PageLoad } from './$types';
import { type Author, createEmailContact } from '$lib';
import type { PresentationCardData } from '$lib/frontendEntities';

function mockAuthor(name: string, id: number): Author {
	return {
		name,
		educations: [],
		skills: [],
		email: createEmailContact(`${name}@mail.ru`),
		id: id.toString()
	};
}

function mockPresentationCardData(
	i: number,
	commentsCount: number = 0,
	averageUserScore?: number,
	...authorNames: string[]
): PresentationCardData {
	return {
		id: i.toString(),
		presentationName: `Presentation ${i}`,
		presentationDescription: `Description of presentation ${i}`,
		presentationUrl: 'https://google.com',
		authors: authorNames.map(mockAuthor),
		commentsCount,
		averageUserScore
	};
}

function getAllPresentationsOfCourse(courseId: string): PresentationCardData[] {
	console.log(`Navigating to screen of course with ${courseId}`);
	const authorNames = ['Alexander', 'Oleg', 'Ivan', 'Eugene'];
	return [
		mockPresentationCardData(1),
		mockPresentationCardData(2, 123),
		mockPresentationCardData(3, 32, 3.5),
		mockPresentationCardData(4, 10, 5, ...authorNames)
	];
}

export const load: PageLoad = async ({
	params
}): Promise<{ presentations: PresentationCardData[] }> => {
	return {
		presentations: getAllPresentationsOfCourse(params.courseId)
	};
};
