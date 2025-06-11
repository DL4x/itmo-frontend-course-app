import { createClient } from '@supabase/supabase-js';
import type {Author} from "$lib/index";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function notifyUserDataChanged(author: Author) {
    // TODO
    console.warn("Refetching user data from Strapi is not implemented.")
}