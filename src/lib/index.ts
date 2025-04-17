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
	assertNotEmpty(id, 'id');
}

export interface IDObject {
	id: string;
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

export function assertValidComment(comment: AuthorComment) {
	assertValidIDObject(comment);
	assertNotEmpty(comment.comment_description, 'comment_description');
}

export function assertValidPresentation(presentation: Presentation) {
	assertValidIDObject(presentation);
	assertNotEmpty(presentation.presentation_name, 'presentation_name');
	assertNotEmpty(presentation.presentation_url, 'presentation_url');
}

export function assertValidVotedPerson(votedPerson: VotedPerson) {
	assertValidIDObject(votedPerson);
	assertValidAuthor(votedPerson.author);
	assertIsInt(votedPerson.person_score, 'person_score');
}

export interface Author extends IDObject{
	name: string;
	educations: Education[];
	skills: Skill[];
	address?: Contact;
	phone?: Contact;
	email?: Contact;
}

export interface AuthorComment extends IDObject {
	comment_description: string;
	author: Author;
}

export interface Presentation extends IDObject {
	presentation_name: string;
	presentation_description: string;
	presentation_url: string;
	presentation_owners: Author[];
	comments: AuthorComment[];
	voted_persons: VotedPerson[];
}

export interface VotedPerson extends IDObject {
	author: Author;
	person_score: number;
}
