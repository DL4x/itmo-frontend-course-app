import type {
    Author,
    AuthorComment, Company,
    Contact,
    Course,
    Education, Favourite,
    IDObject,
    Presentation,
    PresentationStatus,
    ProgressBar,
    Skill, Tag,
    TimeRange,
    VotedAuthor
} from '$lib/index';
// ABOBA THIS MESSAGE IS WRITTEN BY BALBEKOV A. D BY SPECIAL REQUEST OF GERASIMOV E. O.

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

export function assertValidTimeRange({end, start}: TimeRange) {
    assertIsInt(start, 'start');
    assertIsInt(end, 'end');
    assert(start <= end, 'Time range start must be <= time range end');
}

export function assertValidIDObject({id}: IDObject) {
    assertNotEmpty(id, 'id');
}

export function assertValidSkill(skill: Skill) {
    assertValidIDObject(skill);
    const {name, value} = skill;
    assertNotEmpty(name, 'name');
    assertIsInt(value, 'value');
    assert(0 <= value && value <= 100, 'Skill must be an integer in range [0;100]');
}

export function assertValidContact({value}: Contact) {
    assertNotEmpty(value, 'Contact value');
}

export function assertValidEducation(education: Education) {
    assertValidIDObject(education);
    assertNotEmpty(education.title, 'title');
}

export function assertValidCompany(company: Company) {
    assertValidIDObject(company);
    assertNotEmpty(company.companyName, 'name');
}

export function assertValidFavourite(favourite: Favourite) {
    assertValidIDObject(favourite);
    assertNotEmpty(favourite.authorDocumentId, 'authorId');
    assertNotEmpty(favourite.presentationDocumentId, 'presentationId');
}

export function assertValidPresentationStatus(presentationStatus: PresentationStatus) {
    assertValidIDObject(presentationStatus);
    assertNotEmpty(presentationStatus.presentationDocumentId, 'presentation_name');
}

export function assertValidProgressBar(progressBar: ProgressBar) {
    assertValidIDObject(progressBar);
    assertNotEmpty(progressBar.courseDocumentId, 'courseDocumentId');
}

export function assertValidAuthor(author: Author) {
    assertNotEmpty(author.name, 'name');
}

export function assertValidComment(comment: AuthorComment) {
    assertValidIDObject(comment);
    assertNotEmpty(comment.commentDescription, 'comment_description');
}

export function assertValidPresentation(presentation: Presentation) {
    assertValidIDObject(presentation);
    assertNotEmpty(presentation.presentationName, 'presentation_name');
    assertNotEmpty(presentation.presentationUrl, 'presentation_url');
}

export function assertValidTag(tag: Tag) {
    assertValidIDObject(tag);
    assertNotEmpty(tag.name, 'tag_name');
}

export function assertValidVotedAuthor(votedPerson: VotedAuthor) {
    assertValidIDObject(votedPerson);
    assertIsInt(votedPerson.authorScore, 'author_score');
}

export function assertValidCourse(course: Course) {
    assertValidIDObject(course);
    assertNotEmpty(course.courseName, 'course_name');
}