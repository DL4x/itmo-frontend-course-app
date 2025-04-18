import type { PageLoad } from './$types';
import { getPresentationByDocumentId } from '$lib/strapiRepository';

export const load: PageLoad = async ({ params }) => {
    return {
        presentation: await getPresentationByDocumentId(params.lectureId)
    };
};
