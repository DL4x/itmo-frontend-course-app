import {
	type Author,
	type AuthorComment,
	type Presentation,
	type Education,
	type Skill,
	type TimeRange, type VotedPerson
} from '$lib/index';
import {
	assert,
	assertValidAuthor,
	assertValidComment, assertValidContact, assertValidEducation,
	assertValidPresentation, assertValidSkill, assertValidTimeRange,
	assertValidVotedPerson
} from '$lib/errors';
import Strapi from 'strapi-sdk-js';

type TypeString =
	| 'undefined'
	| 'object'
	| 'boolean'
	| 'number'
	| 'string'
	| 'function'
	| 'symbol'
	| 'bigint';

// If you don't know what is `asserts`, you can
function assertField(
	condition: boolean,
	fieldName: string,
	fieldType: TypeString | 'Array'
): asserts condition {
	assert(condition, `object must have field ${fieldName}: ${fieldType}`);
}

function parseSkill(json: object): Skill {
	assertField('id' in json && typeof json.id === 'number', 'id', 'number');
	assertField('skill_name' in json && typeof json.skill_name === 'string', 'skill_name', 'string');
	assertField(
		'skill_percent' in json && typeof json.skill_percent === 'number',
		'skill_percent',
		'number'
	);
	const result = { id: json.id.toString(), name: json.skill_name, value: json.skill_percent };
	assertValidSkill(result);
	return result;
}

function parseTimeRange(json: object): TimeRange {
	assertField(
		'educate_end' in json && typeof json.educate_end === 'string',
		'educate_end',
		'string'
	);
	assertField(
		'educate_start' in json && typeof json.educate_start === 'string',
		'educate_start',
		'string'
	);
	const result = { start: parseInt(json.educate_start), end: parseInt(json.educate_end) };
	assertValidTimeRange(result);
	return result;
}

function parseEducation(json: object): Education {
	assertField('id' in json && typeof json.id === 'number', 'id', 'number');
	assertField(
		'education_name' in json && typeof json.education_name === 'string',
		'education_name',
		'string'
	);
	assertField(
		'education_level' in json && typeof json.education_level === 'string',
		'education_level',
		'string'
	);
	const result = {
		id: json.id.toString(),
		title: json.education_name,
		subtitle: json.education_level,
		timeRange: parseTimeRange(json)
	};
	assertValidEducation(result);
	return result;
}

function toHRef(phone: string): string {
	phone = phone.replace(/(?!^)\+|\D/g, '');
	return phone.startsWith('7') ? `tel:+${phone}` : `tel:${phone}`;
}

function parseAuthor(json: unknown): Author {
	assert(typeof json === 'object' && json !== null, 'json must be object');
	assertField('documentId' in json && typeof json.documentId === 'string', 'documentId', 'string');
	assertField(
		'person_name' in json && typeof json.person_name === 'string',
		'person_name',
		'string'
	);
	assertField('companies' in json && Array.isArray(json.companies), 'companies', 'Array');
	assertField('skills' in json && Array.isArray(json.skills), 'skills', 'Array');
	assertField('educations' in json && Array.isArray(json.educations), 'educations', 'Array');
	assertField(
		'person_address' in json && typeof json.person_address === 'string',
		'person_address',
		'string'
	);
	assertField(
		'person_phone' in json && typeof json.person_phone === 'string',
		'person_phone',
		'string'
	);
	assertField(
		'person_email' in json && typeof json.person_email === 'string',
		'person_email',
		'string'
	);
	const address = { value: json.person_address, href: '' };
	assertValidContact(address);
	const phone = { value: json.person_phone, href: toHRef(json.person_phone) };
	assertValidContact(phone);
	const email = { value: json.person_email, href: `mailto:${json.person_email}` };
	assertValidContact(email);
	const result = {
		id: json.documentId,
		name: json.person_name,
		educations: json.educations.map(parseEducation),
		skills: json.skills.map(parseSkill),
		address: address,
		phone: phone,
		email: email
	};
	assertValidAuthor(result);
	return result;
}

async function parseComment(json: unknown): Promise<AuthorComment> {
	assert(typeof json === 'object' && json !== null, 'json must be object');

	assertField('id' in json && typeof json.id === 'number', 'id', 'number');
	assertField(
		'comment_description' in json && typeof json.comment_description === 'string',
		'comment_description',
		'string'
	);
	assertField(
		'person' in json && typeof json.person === 'object' && json.person !== null,
		'person',
		'object'
	);
	assertField('documentId' in json && typeof json.documentId === 'string', 'documentId', 'string');
	assertField(
		'documentId' in json.person && typeof json.person.documentId === 'string',
		'documentId',
		'string'
	);

	const result = {
		id: json.id.toString(),
		documentId: json.documentId,
		comment_description: json.comment_description,
		author: await getAuthorByDocumentId(json.person.documentId)
	};
	assertValidComment(result);
	return result;
}

async function parseVotedPerson(json: unknown): Promise<VotedPerson> {
	assert(typeof json === 'object' && json !== null, 'json must be object');
	assertField('id' in json && typeof json.id === 'number', 'id', 'number');
	assertField(
		'person' in json && typeof json.person === 'object' && json.person !== null,
		'person',
		'object'
	);
	assertField(
		'documentId' in json.person && typeof json.person.documentId === 'string',
		'documentId',
		'string'
	);
	assertField(
		'person_score' in json && typeof json.person_score === 'number',
		'person_score',
		'number'
	);

	const result = {
		id: json.id.toString(),
		person_score: json.person_score,
		author: await getAuthorByDocumentId(json.person.documentId)
	};

	assertValidVotedPerson(result);

	return result;
}

async function parsePresentation(json: unknown): Promise<Presentation> {
	assert(typeof json === 'object' && json !== null, 'json must be object');

	assertField('id' in json && typeof json.id === 'number', 'id', 'number');
	assertField('documentId' in json && typeof json.documentId === 'string', 'documentId', 'string');

	assertField(
		'presentation_name' in json && typeof json.presentation_name === 'string',
		'presentation_name',
		'string'
	);
	assertField(
		'presentation_description' in json && typeof json.presentation_description === 'string',
		'presentation_description',
		'string'
	);
	assertField(
		'presentation_url' in json && typeof json.presentation_url === 'string',
		'presentation_url',
		'string'
	);
	assertField(
		'presentation_owners' in json && Array.isArray(json.presentation_owners),
		'presentation_owners',
		'Array'
	);
	assertField('comments' in json && Array.isArray(json.comments), 'comments', 'Array');
	assertField('voted_persons' in json && Array.isArray(json.voted_persons), 'comments', 'Array');

	const voted_persons = await Promise.all(json.voted_persons.map(parseVotedPerson));

	const result = {
		id: json.id.toString(),
		presentation_name: json.presentation_name,
		presentation_description: json.presentation_description,
		presentation_url: json.presentation_url,
		documentId: json.documentId,
		voted_persons: voted_persons,
		presentation_owners: await Promise.all(
			json.presentation_owners.map((author: object) => {
				assertField(
					'documentId' in author && typeof author.documentId === 'string',
					'documentId',
					'string'
				);
				return getAuthorByDocumentId(author.documentId);
			})
		),
		comments: await Promise.all(
			json.comments.map((author: object) => {
				assertField(
					'documentId' in author && typeof author.documentId === 'string',
					'documentId',
					'string'
				);
				return getCommentByDocumentId(author.documentId);
			})
		)
	};
	assertValidPresentation(result);
	return result;
}

const strapi = new Strapi({
	url: 'https://railway-strapi-production-7054.up.railway.app',
	prefix: '/api',
	store: {
		key: 'strapi_jwt',
		useLocalStorage: false
	}
});

export async function getAuthorByDocumentId(documentId: string): Promise<Author> {
	const response = await strapi.findOne(`persons`, documentId, { populate : '*'});
	const json: object = response.data;
	assert(json !== null);
	return parseAuthor(json);
}

export async function getAllAuthors(): Promise<Author[]> {
	const response = await strapi.find('persons?populate=*');
	const json = response.data;
	assertField(Array.isArray(response.data), 'data', 'Array');

	console.log('All authors has this JSON:', json);
	return json.map(parseAuthor);
}

export async function getPresentationByDocumentId(documentId: string): Promise<Presentation> {
	const response = await strapi.findOne(`presentations`, documentId, {
		populate: {
			presentation_owners: { populate: '*' },
			comments: { populate: '*' },
			voted_persons: {
				on: {
					'voted-person.voted-person': {
						populate: {
							person: {
								populate: '*'
							}
						}
					}
				}
			}
		}
	});
	const json: object = response.data;
	assert(json !== null);
	return parsePresentation(json);
}

export async function getAllPresentations(): Promise<Presentation[]> {
	const response = await strapi.find('presentations?populate=*');
	const json = response.data;
	assertField(Array.isArray(response.data), 'data', 'Array');

	console.log('All authors has this JSON:', json);
	return Promise.all(
		json.map((value) => {
			return parsePresentation(value);
		})
	);
}

export async function getCommentByDocumentId(documentId: string): Promise<AuthorComment> {
	const response = await strapi.findOne(`comments`, documentId, { populate: '*'});
	const json: object = response.data;
	assert(json !== null);
	return parseComment(json);
}

export async function getAllComments(): Promise<AuthorComment[]> {
	const response = await strapi.find('comments?populate=*');
	const json = response.data;
	assertField(Array.isArray(response.data), 'data', 'Array');

	console.log('All authors has this JSON:', json);
	return await Promise.all(json.map(parseComment));
}

async function getAuthorJson(
	name: string,
	address: string,
	phone: string,
	email: string,
	educations: Education[] = [],
	skills: Skill[] = [],
	presentations: Presentation[] = [],
	comments: AuthorComment[] = []
): Promise<object> {
	const data = {
		person_name: name,
		person_address: address,
		person_phone: phone,
		person_email: email,
		educations: educations.map(education => ({
			education_name: education.title,
			educate_start: education.timeRange.start,
			educate_end: education.timeRange.end,
			educate_level: education.subtitle
		})),
		skills: skills.map(skill => ({
			skill_name: skill.name,
			skill_percent: skill.value
		})),
		created_presentations: presentations.map(presentation => ({
			presentation_name: presentation.presentation_name,
			presentation_description: presentation.presentation_description,
			voted_persons: {}
		})),
		comments: [{}]
	};

	data.comments = comments.map(comment => ({
		comment_description: comment.comment_description,
		person: data
	}));

	return data;
}

export async function addAuthor(
	name: string,
	address: string,
	phone: string,
	email: string,
	educations: Education[] = [],
	skills: Skill[] = [],
	presentations: Presentation[] = [],
	comments: AuthorComment[] = []
) {
	const allAuthors = await getAllAuthors();
	for (const author of allAuthors) {
		assert(author.email?.value !== email, `Current author already exists`);
	}

	const response = await strapi.create(
		'persons',
		getAuthorJson(name, address, phone, email, educations, skills, presentations, comments)
	);

	console.log(response);
}