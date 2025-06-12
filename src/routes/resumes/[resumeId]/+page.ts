import type { PageLoad } from './$types';
import { getAuthorByDocumentId } from '$lib/strapiRepository';
import { getPresentationByDocumentId } from '$lib/strapiRepository';
import type { Author } from '$lib';
import type { Presentation } from '$lib';

export const load: PageLoad = async ({ params }): Promise<{ author: Author, lections: Presentation[] }> => {
    const author = await getAuthorByDocumentId(params.resumeId);
    const lections = await Promise.all(
        author.createdPresentationDocumentIds.map(id => getPresentationByDocumentId(id))
    );
    return {
        author: author,
        lections: lections
    };
};
