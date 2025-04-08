import {
	assertValidAuthor,
	assertValidContact,
	assertValidEducation,
	assertValidSkill,
	assertValidTimeRange,
	type Author,
	type Education,
	type Skill,
	type TimeRange
} from '$lib/index';
import { assert } from '$lib/errors';

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
	const result = { id: json.id, name: json.skill_name, value: json.skill_percent };
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
		id: json.id,
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

function parseAuthor(json: object): Author {
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
		documentId: json.documentId,
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

// export async function getMyPersonsAndIdes(): Promise<Author[]> {
// 	const client = await fetch(
// 		'https://railway-strapi-production-7054.up.railway.app/api/persons?populate=*'
// 	);
// 	const jsonData = await client.json();
//
// 	const persons: Author[] = [];
// 	for (const person of jsonData.data) {
// 		persons.push(parseAuthor(person));
// 	}
// 	return persons;
// }

export async function getAuthorByDocumentId(documentId: string): Promise<Author> {
	const response = await fetch(
		`https://railway-strapi-production-7054.up.railway.app/api/persons/${documentId}?populate=*`
	);
	const json: object = await response.json();
	assertField('data' in json && typeof json.data === 'object', 'data', 'object');
	assert(json.data !== null);
	return parseAuthor(json.data);
}

export async function getAllAuthors(): Promise<Author[]> {
	const response = await fetch(
		'https://railway-strapi-production-7054.up.railway.app/api/persons?populate=*'
	);
	const json: object = await response.json();
	assertField('data' in json && Array.isArray(json.data), 'data', 'Array');

	console.log('All authors has this JSON:', json);
	return json.data.map(parseAuthor);
}
