import { getAllCourses } from '$lib/strapiRepository';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const courses = await getAllCourses();
    return { courses };
};