import type { PageLoad } from './$types';
import { type Presentation } from '$lib';
import type { PresentationCardData } from '$lib/frontendEntities';
import { getPresentationsByCourseDocumentId } from '$lib/strapiRepository';

// function mockAuthor(name: string, id: number): Author {
// 	return {
// 		name,
// 		educations: [],
// 		skills: [],
// 		email: createEmailContact(`${name}@mail.ru`),
// 		id: id.toString()
// 	};
// }
//
// const PLACEHOLDER_IMG_URL = 'https://i.pinimg.com/originals/b9/a3/ff/b9a3fffae9c48308b0c9d33c5859af4b.jpg';
//
// function mockPresentationCardData(
// 	i: number,
// 	commentsCount: number = 0,
// 	averageUserScore?: number,
// 	presentationUrl: string = PLACEHOLDER_IMG_URL,
// 	...authorNames: string[]
// ): PresentationCardData {
// 	return {
// 		lectureNumber: i + 1,
// 		id: i.toString(),
// 		name: `Presentation ${i}`,
// 		description: `Description of presentation ${i}`.repeat(5),
// 		authors: authorNames.map(mockAuthor),
// 		presentationUrlId: presentationUrl,
// 		commentsCount,
// 		averageUserScore
// 	};
// }

/*function getAllPresentationsOfCourse(courseId: string): PresentationCardData[] {
	console.log(`Navigating to screen of course with ${courseId}`);
	const authorNames = ['Alexander', 'Oleg', 'Ivan', 'Eugene Gerasimov Olegovich'];
	return [
		mockPresentationCardData(0, 0, undefined, ),
		mockPresentationCardData(1, 123, undefined, ""),
		mockPresentationCardData(2, 32, 3.5),
		mockPresentationCardData(3, 10, 5, PLACEHOLDER_IMG_URL, ...authorNames),
		// mockPresentationCardData(4, 365000, 5, "", ...authorNames.slice(1)),
		mockPresentationCardData(5, 999000000, 3.4354321, PLACEHOLDER_IMG_URL, ...authorNames.slice(2))
	];
}*/

function mapToPresentationCardData(value: Presentation, index: number): PresentationCardData {
    return {
        lectureNumber: index + 1,
        name: value.presentationName,
        description: value.presentationDescription,
        presentationUrl: value.presentationUrl,
        authors: value.presentationOwners,
        commentsCount: value.comments.length,
        id: value.id
    };
}

export const load: PageLoad = async ({
    params
}): Promise<{ presentations: PresentationCardData[] }> => {
    return {
        presentations: (await getPresentationsByCourseDocumentId(params.courseId)).map(
            mapToPresentationCardData
        )
    };
};
