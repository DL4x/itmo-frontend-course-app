import type { PageLoad } from './$types';
import { Author, Contact, Education, Skill, TimeRange } from '$lib';

export const load: PageLoad = ({ params }) => {
	console.log(`Imitating fetch of resume with id = ${params.slug}`);
	const educations = Education.list(
		['ITMO university', 'Studying now — Computer Technologies', new TimeRange(2022)],
		['Gymnasia №1', 'Secondary school', new TimeRange(2016, 2022)],
		['Gymnasia №1', 'Primary school', new TimeRange(2011, 2016)]
	);
	const skills = Skill.list({
		HTML: 75,
		CSS: 75,
		Java: 100,
		Kotlin: 100,
		Go: 75,
		'C++': 50,
		C: 50
	});
	return {
		author: new Author(
			params.slug,
			'Balbekov Alexander',
			educations,
			skills,
			new Contact('St. Petersburg, Alpiyskiy lane, 15k2'),
			new Contact('+7 (927) 689 03 47', 'tel:+79276890347'),
			new Contact('balbekov.ad@mail.ru', 'mailto:balbekov.ad@mail.ru'))
	};
};
