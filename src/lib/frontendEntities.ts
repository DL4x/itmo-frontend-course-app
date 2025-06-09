import type { Author, Course, IDObject, Presentation, VotedPerson } from '$lib/index';
import { derived, get } from 'svelte/store';
import { userStore } from '$lib/store';

export interface PresentationCardData extends IDObject {
    lectureNumber: number;
    name: string;
    description: string;
    previewUrl: string;
    authors: Author[];
    commentsCount: number;
    averageUserScore?: number;
    visited: boolean;
}

function averageScoreOf(votedPersons: VotedPerson[]): number | undefined {
    if (votedPersons.length === 0) {
        return undefined;
    }
    return votedPersons.reduce((acc, x) => acc + x.personScore, 0) / votedPersons.length;
}

export function mapToPresentationCardData(
    presentation: Presentation,
    index: number,
    visited: Set<string>
): PresentationCardData {
    return {
        lectureNumber: index + 1,
        name: presentation.presentationName,
        description: presentation.presentationDescription,
        previewUrl: presentation.presentationPreviewUrl ?? '',
        authors: presentation.presentationOwners,
        commentsCount: presentation.comments.length,
        id: presentation.documentId,
        averageUserScore: averageScoreOf(presentation.votedPersons),
        visited: visited.has(presentation.documentId),
    };
}

export interface ToggleableTag {

}

export interface CoursePageData extends IDObject {
    title: string;
    previewUrl: string;
    description: string;
    presentations: PresentationCardData[];
}

export function mapToCoursePageData(course: Course): CoursePageData {
    const user = get(userStore);
    const visited = new Set<string>(
        (user !== null ? user.progressBars : [])
            .filter((progressBar) => progressBar.courseDocumentId === course.documentId)
            .flatMap((progressBar) => progressBar.presentationChecks)
            .filter((status) => status.isVisited)
            .map((status) => status.presentationDocumentId)
    );

    return {
        id: course.documentId,
        title: course.courseName,
        description: course.courseDescription ?? '',
        previewUrl:
            course.coursePreviewUrl.length !== 0
                ? course.coursePreviewUrl
                : 'https://i.pinimg.com/originals/b9/a3/ff/b9a3fffae9c48308b0c9d33c5859af4b.jpg',
        presentations: course.presentations.map((presentation, i) => {
            return mapToPresentationCardData(presentation, i, visited);
        })
    };
}

export const favoritePresentationsIDs = derived(userStore, (user) => {
    if (user === null) {
        return null;
    }
    return new Set<string>(user.favourites.map((presentation) => presentation.documentId));
});
