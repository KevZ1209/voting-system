import { supabase } from "$lib/supabaseClient";
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const email = await request.json();

    console.log(email)

    /* TODO: Better Error Checking :shrug: */

    return json(true);
}