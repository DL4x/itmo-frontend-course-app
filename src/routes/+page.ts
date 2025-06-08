import { getAllCoursePreviews } from '$lib/strapiRepository';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const courses = await getAllCoursePreviews();
    return { courses };
};
