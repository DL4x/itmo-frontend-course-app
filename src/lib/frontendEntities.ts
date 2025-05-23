import type { Author, Course, IDObject, Presentation } from '$lib/index';

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

export function mapToPresentationCardData(
    value: Presentation,
    index: number
): PresentationCardData {
    return {
        lectureNumber: index + 1,
        name: value.presentationName,
        description: value.presentationDescription,
        presentationUrl: value.presentationPreviewUrl ?? "",
        authors: value.presentationOwners,
        commentsCount: value.comments.length,
        id: value.id
    };
}

export interface CoursePageData extends IDObject {
    title: string;
    previewUrl: string;
    description: string;
    presentations: PresentationCardData[];
}

export function mapToCoursePageData(course: Course): CoursePageData {
    return {
        id: course.documentId,
        title: course.courseName,
        description: course.courseDescription,
        previewUrl: 'https://i.pinimg.com/originals/b9/a3/ff/b9a3fffae9c48308b0c9d33c5859af4b.jpg',
        presentations: course.presentations.map(mapToPresentationCardData)
    };
}
