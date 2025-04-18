import type { PageLoad } from './$types';
import type { Author, Presentation } from '$lib';
// import { getLectureByDocumentId } from '$lib/strapiRepository';

export const load: PageLoad = async ({ params }) => {
    const egor: Author = {
        id: 'fjsdfjds',
        name: 'Egor',
        educations: [],
        skills: [],
        address: undefined,
        phone: undefined,
        email: {value: 'pingwin.shulpin@gmail.com', href: '#'},
    }

    const arina: Author = {
        id: 'dasgfha',
        name: 'Arina',
        educations: [],
        skills: [],
        address: undefined,
        phone: undefined,
        email: {value: 'arinaka.ha@yandex.ru', href: '#'},
    }

    const presentation: Presentation = {
        id: params.lectureId,
        presentationName: 'Web Vitals и оптимизация производительности',
        presentationDescription: 'Лекция про Web Vitals и оптимизацию производительности',
        presentationUrl: '1zEa90IEpD1fTUgj6pXTZzeoe2tiMPEq9',
        presentationOwners: [],
        comments: [{commentDescription: "Hello", author: egor, id: '123123'}, {commentDescription: "Bye", author: arina, id: '321312'}],
        votedPersons: [{personScore: 5, id: 'ajdkbasd', author: egor}, {personScore: 3, id: 'dansjdna', author: arina}],
        course: {courseName: 'sadasd', coursePreviewUrl: 'sdad', id: 'sdknad', presentations: []}
    };

    return {
        presentation
        // await getLectureByDocumentId(params.lectureId)
    };
};
