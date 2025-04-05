import type { PageLoad } from './$types';
import { Author } from '$lib';

export const load: PageLoad = async () => {
	const response = await fetch('https://railway-strapi-production-7054.up.railway.app/api/persons?populate=*');

	const { data } = await response.json();

	const a = data.map(person => [person.person_name, person.id]);

	return {
		authors: Author.list(a)
	};
};