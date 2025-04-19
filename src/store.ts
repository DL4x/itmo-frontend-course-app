import { type Writable, writable } from 'svelte/store';
import type { Author } from '$lib';

export const userStore: Writable<Author | null> = writable(null);