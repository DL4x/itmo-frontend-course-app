import type { PageLoad } from './$types';
import { getCourseByDocumentId } from '$lib/strapiRepository';
import { type CoursePageData, mapToCoursePageData } from '$lib/frontendEntities';
import type { Course } from '$lib';

export const load: PageLoad = async ({ params }): Promise<CoursePageData> => {
    let course: Course;
    try {
        course = await getCourseByDocumentId(params.courseId);
    } catch (e) {
        console.error(`Error happened while fetching course data: ${e}`)
        throw e
    }
    return mapToCoursePageData(course);
};
