import type { PageLoad } from './$types';
import { Author } from '$lib';

export const load: PageLoad = () => {
	return {
		authors: Author.list('Balbekov Alexander', 'Gerasimov Eugene', 'Ataev Abulmuslim')
	};
};