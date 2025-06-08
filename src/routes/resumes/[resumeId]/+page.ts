import type { PageLoad } from './$types';
import { getAuthorByDocumentId } from '$lib/strapiRepository';
import type { Author } from '$lib';

export const load: PageLoad = async ({ params }): Promise<{ author: Author }> => {
    return {
        author: await getAuthorByDocumentId(params.resumeId)
    };
};
