import { type Writable, writable } from 'svelte/store';
import type { Author } from '$lib/index';

export const userStore: Writable<Author | null> = writable(null);
