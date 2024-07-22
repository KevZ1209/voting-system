import { supabase } from "$lib/supabaseClient";
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const info = await request.json();

    // const { error } = await supabase.from('voting').insert(emailData).select();
    await supabase.from('voting').update(info).eq('email', info.email).select()

    return json(true)
}