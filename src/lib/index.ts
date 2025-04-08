import { assert, assertIsInt, assertNotEmpty } from '$lib/errors';

export function assertValidTimeRange({ end, start }: TimeRange) {
	assertIsInt(start, 'start');
	assertIsInt(end, 'end');
	assert(start <= end, 'Time range start must be <= time range end');
}

export interface TimeRange {
	start: number;
	end: number;
}

export function assertValidIDObject({ id }: IDObject) {
	assertIsInt(id, 'id');
}

export interface IDObject {
	id: number;
}

export function assertValidSkill(skill: Skill) {
	assertValidIDObject(skill);
	const { name, value } = skill;
	assertNotEmpty(name, 'name');
	assertIsInt(value, 'value');
	assert(0 <= value && value <= 100, 'Skill must be an integer in range [0;100]');
}

/**
 * @property {number} value integer that shows how developed is Skill. Measured in percents. Fits in range [0; 100]
 */
export interface Skill extends IDObject {
	name: string;
	value: number;
}

export function assertValidContact({ value }: Contact) {
	assertNotEmpty(value, 'Contact value');
}

export interface Contact {
	value: string;
	href: string;
}

export function assertValidEducation(education: Education) {
	assertValidIDObject(education);
	assertNotEmpty(education.title, 'title');
}

export interface Education extends IDObject {
	title: string;
	subtitle: string;
	timeRange: TimeRange;
}

export function assertValidAuthor(author: Author) {
	assertNotEmpty(author.name, 'name');
}

/**
 * I don't know why, but Strapi identifies authors in repo not with `id`, but with `documentId` field.
 *
 * I can send request single author from strapi only if I know documentId.
 * So I decided to delete `id` field and store `documentId` instead
 */
export interface Author {
	documentId: string;
	name: string;
	educations: Education[];
	skills: Skill[];
	address?: Contact;
	phone?: Contact;
	email?: Contact;
}
