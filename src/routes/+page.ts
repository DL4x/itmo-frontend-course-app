import type { PageLoad } from './$types';
import { Author } from '$lib';

export const load: PageLoad = async () => {
	const response = await fetch('https://railway-strapi-production-7054.up.railway.app/api/persons?populate=*');// await get(ref(db, `resumes/${params.slug}`));

	const { data } = await response.json();

	const a = data.map(person => [person.person_name, person.id])

	console.log(a);

	return {
		authors: Author.list(a)
	};
};