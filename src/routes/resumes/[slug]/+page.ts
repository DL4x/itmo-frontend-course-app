import type { PageLoad } from './$types';
import { Author, Contact, Education, Skill, TimeRange } from '$lib';
import { fetchUserById } from '$lib/strapi/fetcher';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const userData = await fetchUserById(params.slug);

	if (!userData) {
		redirect(307, '/not-found');
	}

	const educations = Education.list(
		...userData.educations.map((edu: {
			education_name: any;
			education_level: any;
			educate_start: string;
			educate_end: string;
		}) => [
			edu.education_name,
			edu.education_level,
			new TimeRange(parseInt(edu.educate_start), parseInt(edu.educate_end))
		])
	);

	const skills = Skill.list(
		userData.skills.reduce((acc: { [x: string]: any; },
								skill: { skill_name: string | number; skill_percent: any; }) => {
			acc[skill.skill_name] = skill.skill_percent;
			return acc;
		}, {})
	);

	return {
		author: new Author(
			params.slug,
			userData.person_name,
			educations,
			skills,
			new Contact(userData.person_address),
			new Contact(userData.person_phone, `tel:${userData.person_phone}`),
			new Contact(userData.person_email, `mailto:${userData.person_email}`)
		)
	};
};