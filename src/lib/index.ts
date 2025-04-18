export interface TimeRange {
	start: number;
	end: number;
}

export interface IDObject {
	id: string;
}

/**
 * @property {number} value integer that shows how developed is Skill. Measured in percents. Fits in range [0; 100]
 */
export interface Skill extends IDObject {
	name: string;
	value: number;
}

export interface Contact {
	value: string;
	href: string;
}

export interface Education extends IDObject {
	title: string;
	subtitle: string;
	timeRange: TimeRange;
}

export interface Author extends IDObject{
	name: string;
	educations: Education[];
	skills: Skill[];
	address?: Contact;
	phone?: Contact;
	email: Contact;
}

export interface AuthorComment extends IDObject {
	commentDescription: string;
	author: Author;
}

export interface Presentation extends IDObject {
	presentationName: string;
	presentationDescription: string;
	presentationUrl: string;
	presentationOwners: Author[];
	comments: AuthorComment[];
	votedPersons: VotedPerson[];
}

export interface VotedPerson extends IDObject {
	author: Author;
	personScore: number;
}

export interface Course extends IDObject {
	courseName: string;
	coursePreviewUrl: string;
	presentations: Presentation[];
}
