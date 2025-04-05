import type { PageLoad } from './$types';
import { Author } from '$lib';
import { fetchUsers } from '$lib/strapi/fetcher';

export const load: PageLoad = async () => {
	const users = await fetchUsers();

	return {
		authors: Author.list(users)
	};
};