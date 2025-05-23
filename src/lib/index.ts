import { assertNotEmpty } from '$lib/errors';

export interface TimeRange {
	start: number;
	end: number;
}

export interface IDObject {
	id: string;
}

/**
 * @type Skill Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {number} value integer that shows how developed is Skill. Measured in percents. Fits in range [0; 100]
 * @property {string} name skill name
 */
export interface Skill extends IDObject {
	name: string;
	value: number;
}

/**
 * @type Contact Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} value string of contact data. For example for email, address, phone.
 * @property {string} href href for better view
 */
export interface Contact {
	value: string;
	href: string;
}

/**
 * @type Education Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} title name of Education
 * @property {string} subtitle description of Education
 * @property {TimeRange} timeRange two integers that show start and end of Education
 */

export function createEmailContact(email: string): Contact {
	assertNotEmpty(email, 'email');
	return {
		value: email,
		href: `mailto:${email}`,
	};
}

export interface Education extends IDObject {
	title: string;
	subtitle: string;
	timeRange: TimeRange;
}

export interface ProgressBar extends IDObject{
	percent: number;
	course: Course;
}

/**
 * @type Author Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} name author name
 * @property {Education[]} educations education of the author starting from school and graduating from universities
 * @property {Skill[]} skills all author skills
 * @property {Contact} address optional field for the author's address
 * @property {Contact} phone optional field for the author's phone
 * @property {Contact} email author email
 */
export interface Author extends IDObject{
	name: string;
	educations: Education[];
	skills: Skill[];
	progressBars: ProgressBar[];
	favourites: Presentation[];
	address?: Contact;
	phone?: Contact;
	email: Contact;
}

/**
 * @type AuthorComment Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} commentDescription text of comment
 * @property {Author} author comment author
 */
export interface AuthorComment extends IDObject {
	commentDescription: string;
	author: Author;
}

/**
 * @type Presentation Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} presentationName name of Presentation
 * @property {string} presentationDescription small description of presentation
 * @property {string} presentationUrl url of presentation. This url must be in the "key" format, and it should not contain http:// or anything like that.
 * @property {string} presentationPreviewUrl url of image. This url must be in the "key" format, and it should not contain http:// or anything like that.
 * @property {Author[]} presentationOwners authors of presentation
 * @property {AuthorComment[]} comments comments of Presentation
 * @property {VotedPerson[]} votedPersons objects which contains voted person and his score
 * @property {Course} course the course in which this presentation was presented
 */
export interface Presentation extends IDObject {
    documentId: string;
	presentationName: string;
	presentationDescription: string;
	presentationUrl: string;
	presentationPreviewUrl?: string;
	presentationOwners: Author[];
	comments: AuthorComment[];
	votedPersons: VotedPerson[];
	course?: Course;
}

/**
 * @type VotedPerson Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {Author} author voted author
 * @property {number} personScore Current number must be in range [0; 5]
 */
export interface VotedPerson extends IDObject {
	author: Author;
	personScore: number;
}

/**
 * @type Course
 * @property {string} courseName name of course
 * @property {string} coursePreviewUrl url of image. This url must be in the "key" format, and it should not contain http:// or anything like that.
 * @property {string} courseDescription small course description
 * @property {Presentation[]} presentations course presentations
 */
export interface Course extends IDObject {
    documentId: string;
	courseName: string;
	coursePreviewUrl: string;
	courseDescription: string;
	presentations: Presentation[];
}
