import {writable} from 'svelte/store';
import Cookies from 'js-cookie';
import type {Author} from '$lib';

const initialUser = Cookies.get('user')
    ? JSON.parse(Cookies.get('user')!)
    : null;

export const userStore = writable<Author | null>(initialUser);

userStore.subscribe((user) => {
    if (!user) {
        Cookies.remove('user');
        return;
    }

    Cookies.set('user', JSON.stringify(user), {expires: 7});
});
