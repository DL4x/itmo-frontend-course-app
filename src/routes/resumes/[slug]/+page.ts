import type { PageLoad } from './$types';
import { getAuthorByDocumentId } from '$lib/strapiRepository';

export const load: PageLoad = async ({ params }) => {
	return {
		author: await getAuthorByDocumentId(params.slug)
	};
};
