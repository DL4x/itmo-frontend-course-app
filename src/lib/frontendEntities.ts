import type { Author, Course, IDObject, Presentation, VotedAuthor } from '$lib/index';
import { derived, get } from 'svelte/store';
import { userStore } from '$lib/store';

export interface PresentationCardData extends IDObject {
    name: string;
    description: string;
    previewUrl: string;
    authors: Author[];
    commentsCount: number;
    averageUserScore?: number;
    visited: boolean;
    tags: Set<string>;
}

function averageScoreOf(votedPersons: VotedAuthor[]): number | undefined {
    if (votedPersons.length === 0) {
        return undefined;
    }
    return votedPersons.reduce((acc, x) => acc + x.authorScore, 0) / votedPersons.length;
}

export function mapToPresentationCardData(
    presentation: Presentation,
    index: number,
    visited: Set<string>
): PresentationCardData {
    return {
        name: `Лекция №${index + 1}: ${presentation.presentationName}`,
        description: presentation.presentationDescription,
        previewUrl: presentation.presentationPreviewUrl ?? '',
        authors: presentation.presentationOwners,
        commentsCount: presentation.comments.length,
        id: presentation.documentId,
        averageUserScore: averageScoreOf(presentation.votedAuthors),
        visited: visited.has(presentation.documentId),
        tags: new Set(presentation.tags.map((tag) => tag.name))
    };
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
            .flatMap((progressBar) => progressBar.presentations)
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
        presentations: course.presentations.map((presentation, i) =>
            mapToPresentationCardData(presentation, i, visited)
        )
    };
}

export const favoritePresentationsIDs = derived(userStore, (user) => {
    if (user === null) {
        return null;
    }
    return new Set<string>(user.favourites.map((favorite) => favorite.presentationDocumentId));
});
