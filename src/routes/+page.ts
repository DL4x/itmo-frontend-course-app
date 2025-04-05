import type { PageLoad } from './$types';
import { getAllAuthors } from '$lib/strapiRepository';

export const load: PageLoad = async () => ({ authors: await getAllAuthors() });
