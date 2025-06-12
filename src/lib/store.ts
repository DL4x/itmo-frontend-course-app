import { writable } from 'svelte/store';
import type { Author } from '$lib';
import { getAuthorByDocumentId } from '$lib/strapiRepository';

const initialUser = typeof window !== 'undefined' ?
    JSON.parse(localStorage.getItem('user') || 'null') :
    null;

export const userStore = writable<Author | null>(initialUser);

userStore.subscribe((user) => {
    if (typeof window === 'undefined') return;

    if (!user) {
        localStorage.removeItem('user');
    } else {
        localStorage.setItem('user', JSON.stringify(user));
    }
});

export async function notifyUserDataChanged(author: Author) {
    userStore.set(await getAuthorByDocumentId(author.id));
}
