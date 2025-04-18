import type {
	Author,
	AuthorComment,
	Contact,
	Education,
	IDObject,
	Presentation,
	Skill,
	TimeRange,
	VotedPerson
} from '$lib/index';

export class AssertionFailedError extends Error {
	constructor(message?: string) {
		super(message);
	}
}

export function assert(condition: boolean, message?: string): asserts condition {
	if (!condition) {
		throw new AssertionFailedError(message);
	}
}

export function assertNotEmpty(value: string, objectName: string) {
	assert(value.length != 0, `${objectName} must be not empty`);
}

export function assertIsInt(value: number, objectName: string) {
	assert(Number.isInteger(value), `${objectName} must be an integer`);
}

export function assertValidTimeRange({ end, start }: TimeRange) {
	assertIsInt(start, 'start');
	assertIsInt(end, 'end');
	assert(start <= end, 'Time range start must be <= time range end');
}

export function assertValidIDObject({ id }: IDObject) {
	assertNotEmpty(id, 'id');
}

export function assertValidSkill(skill: Skill) {
	assertValidIDObject(skill);
	const { name, value } = skill;
	assertNotEmpty(name, 'name');
	assertIsInt(value, 'value');
	assert(0 <= value && value <= 100, 'Skill must be an integer in range [0;100]');
}

export function assertValidContact({ value }: Contact) {
	assertNotEmpty(value, 'Contact value');
}

export function assertValidEducation(education: Education) {
	assertValidIDObject(education);
	assertNotEmpty(education.title, 'title');
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