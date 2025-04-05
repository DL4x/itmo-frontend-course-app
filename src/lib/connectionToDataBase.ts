import { Author, Contact, Education, Skill, TimeRange } from '$lib/index';

/*export class MyEducation {
    private readonly _education_name: string;
    private readonly _education_level: string;
    private readonly _educate_end: string;
    private readonly _educate_start: string;

    constructor(jsonText: object) {
        if (!('education_name' in jsonText && typeof (jsonText.education_name) === 'string' &&
            'education_level' in jsonText && typeof (jsonText.education_level) === 'string' &&
            'educate_end' in jsonText && typeof (jsonText.educate_end) === 'string' &&
            'educate_start' in jsonText && typeof (jsonText.educate_start) === 'string')) {
            throw new Error('MyPerson name must be a string');
        }
        this._education_name = jsonText.education_name;
        this._education_level = jsonText.education_level;
        this._educate_end = jsonText.educate_end;
        this._educate_start = jsonText.educate_start;
    }

    get education_name(): string {
        return this._education_name;
    }

    get education_level(): string {
        return this._education_level;
    }

    get educate_end(): string {
        return this._educate_end;
    }

    get educate_start(): string {
        return this._educate_start;
    }
}*/

/*export class MySkill {
    private readonly _skill_name: string;
    private readonly _skill_percent: number;

    constructor(jsonText: object) {
        if (!('skill_name' in jsonText && typeof (jsonText.skill_name) === 'string' &&
            'skill_percent' in jsonText && typeof (jsonText.skill_percent) === 'number')) {
            throw new Error('MyPerson name must be a string');
        }

        this._skill_name = jsonText.skill_name;
        this._skill_percent = jsonText.skill_percent;
    }

    get skill_name(): string {
        return this._skill_name;
    }

    get skill_percent(): number {
        return this._skill_percent;
    }
}*/

/*export class MyCompany {
    private readonly _company_name: string;
    private readonly _company_description: string;

    constructor(jsonText: object) {
        if (!('company_name' in jsonText && typeof (jsonText.company_name) === 'string' &&
            'company_description' in jsonText && typeof (jsonText.company_description) === 'string')) {
            throw new Error('MyPerson name must be a string');
        }
        this._company_name = jsonText.company_name;
        this._company_description = jsonText.company_description;
    }

    get company_name(): string {
        return this._company_name;
    }

    get company_description(): string {
        return this._company_description;
    }
}*/

/*export class MyPerson {
    private readonly _person_name: string;
    private readonly _person_address: string;
    private readonly _person_phone: string;
    private readonly _person_email: string;
    private readonly _companies : MyCompany[] = [];
    private readonly _skills: MySkill[] = [];
    private readonly _educations: MyEducation[] = [];

    constructor(jsonText: object) {

    }


    get person_name(): string {
        return this._person_name;
    }

    get person_address(): string {
        return this._person_address;
    }

    get person_phone(): string {
        return this._person_phone;
    }

    get person_email(): string {
        return this._person_email;
    }

    get companies(): MyCompany[] {
        return this._companies;
    }

    get skills(): MySkill[] {
        return this._skills;
    }

    get educations(): MyEducation[] {
        return this._educations;
    }
}*/


/*class IdAndMyPerson {
    private readonly _person_name: string;
    private readonly _id: number;

    constructor(jsonText: object) {
        if (!('person_name' in jsonText && typeof (jsonText.person_name) === 'string' &&
            'id' in jsonText && typeof (jsonText.id) === 'number')) {
            throw new Error('MyPerson name must be a string');
        }
        this._id = jsonText.id;
        this._person_name = jsonText.person_name;
    }


    get person_name(): string {
        return this._person_name;
    }

    get id(): number {
        return this._id;
    }
}*/


function parseSkill(jsonText: object) {
    if (!('skill_name' in jsonText && typeof (jsonText.skill_name) === 'string' &&
      'skill_percent' in jsonText && typeof (jsonText.skill_percent) === 'number')) {
        throw new Error('MyPerson name must be a string');
    }
    return new Skill("", jsonText.skill_name, jsonText.skill_percent);
}

function parseEducation(jsonText: object) {
    if (!('education_name' in jsonText && typeof (jsonText.education_name) === 'string' &&
      'education_level' in jsonText && typeof (jsonText.education_level) === 'string' &&
      'educate_end' in jsonText && typeof (jsonText.educate_end) === 'string' &&
      'educate_start' in jsonText && typeof (jsonText.educate_start) === 'string')) {
        throw new Error('MyPerson name must be a string');
    }
    const education_name = jsonText.education_name;
    const education_level = jsonText.education_level;
    const educate_end = jsonText.educate_end;
    const educate_start = jsonText.educate_start;
    return new Education("", education_name, education_level, new TimeRange(parseInt(educate_end), parseInt(educate_start)));
}

function parseAuthor(jsonText: object): Author {

    if (!('person_name' in jsonText && typeof (jsonText.person_name) === 'string')) {
        throw new Error('MyPerson name must be a string');
    }
    const _person_name = jsonText.person_name;

    if (!('companies' in jsonText && Array.isArray(jsonText.companies))) {
        throw new Error('Companies must be in a MyPerson');
    }
    // let companies = jsonText.companies;
    // jsonText.companies.forEach(company => {
    //     this._companies.push(new MyCompany(company));
    // })

    if (!('skills' in jsonText && Array.isArray(jsonText.skills))) {
        throw new Error('MySkills must be in a MyPerson');
    }
    const skills: Skill[] = [];
    jsonText.skills.forEach(skill => {
        skills.push(parseSkill(skill));
    })

    if (!('educations' in jsonText && Array.isArray(jsonText.educations))) {
        throw new Error('MyEducations must be in a MyPerson');
    }
    const educations: Education[] = [];
    jsonText.educations.forEach(education => {
        educations.push(parseEducation(education));
    })

    if (!('person_name' in jsonText && typeof (jsonText.person_name) === 'string' &&
      'person_address' in jsonText && typeof (jsonText.person_address) === 'string' &&
      'person_phone' in jsonText && typeof (jsonText.person_phone) === 'string' &&
      'person_email' in jsonText && typeof (jsonText.person_email) === 'string')) {
        throw new Error('MyPerson name must have address, phone and email');
    }
    const person_address = jsonText.person_address;
    const person_phone = jsonText.person_phone;
    const person_email = jsonText.person_email;
    return new Author(
      "", _person_name, educations, skills,
      new Contact(person_address), new Contact(person_phone), new Contact(person_email, `mailto:${person_email}`));
}

export async function getMyPersonsAndIdes(): Promise<Author[]> {
    const client = await fetch('https://railway-strapi-production-7054.up.railway.app/api/persons?populate=*');
    const jsonData = await client.json();

    const persons: Author[] = []
    for (const person of jsonData.data) {
        persons.push(parseAuthor(person));
    }
    return persons;
}

export async function getMyPersonById(id: number): Promise<Author> {
    const client = await fetch('https://railway-strapi-production-7054.up.railway.app/api/persons?populate=*');
    const jsonData = await client.json();

    for (const person of jsonData.data) {
        if (person.id === id) {
            return parseAuthor(person);
        }
    }
    throw new Error('MyPerson not found');
}

export async function getMyPersons(): Promise<Author[]> {
    const client = await fetch('https://railway-strapi-production-7054.up.railway.app/api/persons?populate=*');
    const jsonData = await client.json();

    const persons: Author[] = []
    for (const person of jsonData.data) {
        persons.push(parseAuthor(person));
    }
    return persons;
}