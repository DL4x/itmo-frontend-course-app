import { assertNotEmpty } from '$lib/errors';

// ABOBA THIS MESSAGE IS WRITTEN BY BALBEKOV A. D BY SPECIAL REQUEST OF GERASIMOV E. O.

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

export function createEmailContact(email: string): Contact {
    assertNotEmpty(email, 'email');
    return {
        value: email,
        href: `mailto:${email}`
    };
}

/**
 * @type Education Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} title the name of education
 * @property {string} subtitle the description of education
 * @property {TimeRange} timeRange during which the person learned in (school/university/course)
 */
export interface Education extends IDObject {
    title: string;
    subtitle: string;
    timeRange: TimeRange;
}

/**
 * @type Company Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} companyName the name of company
 * @property {string} companyDescription the description of company
 * @property {string} position in which the person worked in this company
 * @property {string} period during which the person worked for this company
 */
export interface Company extends IDObject {
    companyName: string;
    companyDescription: string;
    position: string;
    period: string;
}

/**
 * @type PresentationStatus Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} presentationDocumentId that has already been viewed
 * @property {string} progressBarDocumentId that this object belongs to
 */
export interface PresentationStatus extends IDObject {
    presentationDocumentId: string;
    progressBarDocumentId: string;
}

/**
 * @type ProgressBar Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {PresentationStatus[]} presentations visited presentations
 * @property {string} courseDocumentId the course that the author is taking
 * @property {string} authorDocumentId the author who is taking the course
 */
export interface ProgressBar extends IDObject {
    presentations: PresentationStatus[];
    courseDocumentId: string;
    personDocumentId: string;
}

/**
 * @type Favourite Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} presentationDocumentId your favorite presentation document ID
 * @property {string} authorDocumentId the author document ID who liked it
 */
export interface Favourite extends IDObject {
    presentationDocumentId: string;
    authorDocumentId: string;
}

/**
 * @type Author Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} name author name
 * @property {Contact} email author email
 * @property {Contact} address optional field for the author's address
 * @property {Contact} phone optional field for the author's phone
 * @property {string} authorBirthday author birthday
 * @property {string} authorCity author hometown
 * @property {string} description small author description
 * @property {Company[]} companies where the author worked
 * @property {Education[]} educations education of the author starting from school and graduating from universities
 * @property {Skill[]} skills all author skills
 * @property {ProgressBar[]} progressBars currently active
 * @property {string[]} createdPresentationDocumentIds an array consisting of document IDs of presentations that the author created
 * @property {Favourite[]} favourites presentation
 */
export interface Author extends IDObject {
    name: string;
    email: Contact;
    address?: Contact;
    phone?: Contact;
    authorBirthday: string;
    authorCity: string;
    authorDescription: string;
    companies: Company[];
    educations: Education[];
    skills: Skill[];
    progressBars: ProgressBar[];
    createdPresentationDocumentIds: string[];
    favourites: Favourite[];
    authorTelegram: string;
    authorGithub: string;
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
 * @property {VotedAuthor[]} votedAuthors objects which contains voted person and his score
 * @property {Course} course the course in which this presentation was presented
 */
export interface Presentation extends IDObject {
    presentationName: string;
    presentationDescription: string;
    presentationUrl: string;
    presentationPreviewUrl?: string;
    presentationOwners: Author[];
    comments: AuthorComment[];
    votedAuthors: VotedAuthor[];
    tags: Tag[];
    courseDocumentId: string;
}

/**
 * @type Tag Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} id of the current tag
 * @property {string} name of the current tag
 */
export interface Tag extends IDObject {
    name: string;
}

/**
 * @type VotedAuthor Be careful using this interface. Preferably, always try to get data from Strapi by documentId.
 * @property {string} authorDocumentId voted author
 * @property {string} presentationDocumentId current presentation
 * @property {number} authorScore Current number must be in range [0; 10]
 */
export interface VotedAuthor extends IDObject {
    authorDocumentId: string;
    presentationDocumentId: string;
    authorScore: number;
}

/**
 * @type Course
 * @property {string} courseName name of course
 * @property {string} coursePreviewUrl url of image. This url must be in the "key" format, and it should not contain http:// or anything like that.
 * @property {string} courseDescription small course description
 * @property {Presentation[]} presentations course presentations
 * @property {number} presentationCount count of presentation in course
 */
export interface Course extends IDObject {
    courseName: string;
    coursePreviewUrl: string;
    courseDescription: string;
    presentations: Presentation[];
    presentationCount: number;
}

export function ratingOf(presentation: Presentation): number {
    const length = presentation.votedAuthors.length;
    if (length === 0) return 0;
    return (
        presentation.votedAuthors
            .map((person) => person.authorScore)
            .reduce((sum, value) => sum + value, 0) / length
    );
}
