import {
    type Author,
    type AuthorComment,
    type Course,
    type Education,
    type Presentation,
    type Skill,
    type TimeRange,
    type VotedPerson
} from '$lib/index';
import {
    assert,
    assertValidAuthor,
    assertValidComment,
    assertValidContact,
    assertValidCourse,
    assertValidEducation,
    assertValidPresentation,
    assertValidSkill,
    assertValidTimeRange,
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
        commentDescription: json.comment_description,
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
        personScore: json.person_score,
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
    // assertField(
    // 	'presentation_preview' in json &&
    // 		typeof json.presentation_preview === 'object' &&
    // 		json.presentation_preview != null,
    // 	'presentation_preview',
    // 	'object'
    // );
    // assertField(
    // 	'url' in json.presentation_preview && typeof json.presentation_preview.url === 'string',
    // 	'url',
    // 	'string'
    // );
    assertField(
        'presentation_owners' in json && Array.isArray(json.presentation_owners),
        'presentation_owners',
        'Array'
    );
    assertField('comments' in json && Array.isArray(json.comments), 'comments', 'Array');
    assertField('voted_persons' in json && Array.isArray(json.voted_persons), 'comments', 'Array');
    assertField(
        'course' in json && typeof json.course === 'object' && json.course !== null,
        'course',
        'object'
    );
    assertField(
        'documentId' in json.course && typeof json.course.documentId === 'string',
        'documentId',
        'string'
    );

    const voted_persons = await Promise.all(json.voted_persons.map(parseVotedPerson));

    const result = {
        id: json.id.toString(),
        presentationName: json.presentation_name,
        presentationDescription: json.presentation_description,
        presentationUrl: json.presentation_url,
        documentId: json.documentId,
        presentationPreviewUrl: undefined, // json.presentation_preview.url,
        votedPersons: voted_persons,
        presentationOwners: await Promise.all(
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

async function parseCourse(json: unknown): Promise<Course> {
    assert(typeof json === 'object' && json !== null, 'json must be object');

    assertField('id' in json && typeof json.id === 'number', 'id', 'number');
    assertField('documentId' in json && typeof json.documentId === 'string', 'documentId', 'string');

    assertField(
        'course_name' in json && typeof json.course_name === 'string',
        'course_name',
        'string'
    );
    assertField(
        'course_description' in json && typeof json.course_description === 'string',
        'course_description',
        'string'
    );
    assertField(
        'presentations' in json && Array.isArray(json.presentations),
        'presentations',
        'Array'
    );
    assertField(
        'course_preview' in json &&
        typeof json.course_preview === 'object' &&
        json.course_preview != null,
        'course_preview',
        'object'
    );
    assertField(
        'url' in json.course_preview && typeof json.course_preview.url === 'string',
        'url',
        'string'
    );

    const result = {
        id: json.id.toString(),
        documentId: json.documentId,
        courseName: json.course_name,
        courseDescription: json.course_description,
        coursePreviewUrl: json.course_preview.url,
        presentations: await Promise.all(json.presentations.map(parsePresentation))
    };
    assertValidCourse(result);
    return result;
}

const path = 'https://railway-strapi-production-7054.up.railway.app';

const strapi = new Strapi({
    url: path,
    prefix: '/api',
    store: {
        key: 'strapi_jwt',
        useLocalStorage: false
    }
});

/**
 * @param documentId the {@linkcode string} that Strapi generates by default
 *
 * @return {@linkcode Author} by documentId
 */

export async function getAuthorByDocumentId(documentId: string): Promise<Author> {
    const response = await strapi.findOne(`persons`, documentId, { populate: '*' });
    const json: object = response.data;
    assert(json !== null);
    return parseAuthor(json);
}

export async function getAuthorByEmail(email: string): Promise<Author> {
    const response = await strapi.find(`persons`, {
        filters: {
            person_email: email
        },
        populate: '*'
    });
    const json: unknown = response.data.at(0);
    assert(json !== null);
    return parseAuthor(json);
}

/**
 * @return All {@linkcode Author}s from Strapi
 */

export async function getAllAuthors(): Promise<Author[]> {
    const response = await strapi.find('persons?populate=*');
    const json = response.data;
    assertField(Array.isArray(response.data), 'data', 'Array');

    console.log('All authors has this JSON:', json);
    return json.map(parseAuthor);
}

/**
 * @param documentId the {@linkcode string} that Strapi generates by default
 *
 * @return {@linkcode Presentation} by documentId
 */
export async function getPresentationByDocumentId(documentId: string): Promise<Presentation> {
    const response = await strapi.findOne(`presentations`, documentId, {
        populate: {
            presentation_owners: { populate: '*' },
            course: { populate: '*' },
            comments: { populate: '*' },
            // presentation_preview: { populate: '*' },
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

/**
 * @return All {@linkcode Presentation} from Strapi
 */
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

/**
 * @param documentId the {@linkcode string} that Strapi generates by default
 *
 * @return {@linkcode AuthorComment} by documentId
 */
export async function getCommentByDocumentId(documentId: string): Promise<AuthorComment> {
    const response = await strapi.findOne(`comments`, documentId, { populate: '*' });
    const json: object = response.data;
    assert(json !== null);
    return parseComment(json);
}

/**
 * @return All {@linkcode AuthorComment} from Strapi
 */
export async function getAllComments(): Promise<AuthorComment[]> {
    const response = await strapi.find('comments?populate=*');
    const json = response.data;
    assertField(Array.isArray(response.data), 'data', 'Array');

    console.log('All authors has this JSON:', json);
    return await Promise.all(json.map(parseComment));
}

/**
 * @return All {@linkcode Course} from Strapi
 */
export async function getAllCourses(): Promise<Course[]> {
    const response = await strapi.find('courses', {
        populate: {
            presentations: {
                populate: {
                    presentation_owners: { populate: '*' },
                    course: { populate: '*' },
                    comments: { populate: '*' },
                    presentation_preview: { populate: '*' },
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
            },
            course_preview: { populate: '*' }
        }
    });
    const json = response.data;
    assertField(Array.isArray(response.data), 'data', 'Array');

    console.log('All authors has this JSON:', json);
    return await Promise.all(json.map(parseCourse));
}

/**
 * @param documentId the {@linkcode string} that Strapi generates by default
 *
 * @return {@linkcode Course} by documentId
 */
export async function getCourseByDocumentId(documentId: string): Promise<Course> {
    const response = await strapi.findOne('courses', documentId, { populate: '*' });
    const json: object = response.data;
    assert(json !== null);
    return parseCourse(json);
}

/**
 * @param documentId course's ID of {@linkcode string} type that Strapi generates by default
 *
 * @return {@linkcode Presentation}[] by documentId
 */
export async function getPresentationsByCourseDocumentId(
    documentId: string
): Promise<Presentation[]> {
    const response = await strapi.findOne('courses', documentId, {
        populate: {
            presentations: {
                populate: {
                    presentation_owners: { populate: '*' },
                    course: { populate: '*' },
                    comments: { populate: '*' },
                    presentation_preview: { populate: '*' },
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
            },
            course_preview: { populate: '*' }
        }
    });
    const json: object = response.data;
    console.log(response.data);
    assert(json !== null);
    return (await parseCourse(json)).presentations;
}

/**
 *
 * This function is designed to bring out the general code and make it more beautiful.
 *
 * @return json-object of {@linkcode Author} for add to Strapi
 */
async function getAuthorJson(
    name: string,
    email: string,
    address?: string,
    phone?: string,
    educations: Education[] = [],
    skills: Skill[] = [],
    presentations: Presentation[] = [],
    comments: AuthorComment[] = []
): Promise<object> {
    return {
        person_name: name,
        person_address: address,
        person_phone: phone,
        person_email: email,
        educations: educations,
        skills: skills,
        created_presentations: presentations,
        comments: comments
    };
}

/**
 * You can only submit a name and email address for the function to work correctly.
 *
 * @param name {@linkcode Author} name
 * @param email {@linkcode Author} email
 * @param phone {@linkcode Author} phone
 * @param address {@linkcode Author} address
 * @param educations {@linkcode Author} educations or undefined
 * @param skills {@linkcode Author} skills or undefined
 * @param presentations {@linkcode Author} presentations or undefined
 * @param comments {@linkcode Author} comments or undefined
 */
export async function addAuthor(
    name: string,
    email: string,
    phone: string = '',
    address: string = '',
    educations: Education[] = [],
    skills: Skill[] = [],
    presentations: Presentation[] = [],
    comments: AuthorComment[] = []
) {
    const allAuthors = await getAllAuthors();
    for (const author of allAuthors) {
        assert(author.email?.value !== email, `Current author already exists`);
    }
    await strapi.create(
        'persons',
        await getAuthorJson(name, email, address, phone, educations, skills, presentations, comments)
    );
}

/**
 * Adds a comment and a link to the author in Strapi
 *
 * @param commentDescription {@linkcode AuthorComment} description
 * @param authorDocumentId {@linkcode AuthorComment} documentId
 */
export async function addComment(commentDescription: string, authorDocumentId: string) {
    const currentAuthor = await getAuthorByDocumentId(authorDocumentId);
    const response = await strapi.create('comments', {
        comment_description: commentDescription,
        person: getAuthorJson(
            currentAuthor.name,
            currentAuthor.email.value,
            currentAuthor.address?.value,
            currentAuthor.phone?.value
        )
    });
    console.log(response);
}

/**
 * For those who will draw pictures so as not to worry about the path.
 *
 * @param imageUrl image url. This url must be in the "key" format, and it should not contain http:// or anything like that.
 *
 * @return full path to image in Strapi
 */
export function getFullImagePath(imageUrl: string): string {
    return path + '/uploads/' + imageUrl;
}
