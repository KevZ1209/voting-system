import { supabase } from "$lib/supabaseClient";
import { json } from '@sveltejs/kit';

export async function GET() {
    const { data } = await supabase.from('voting').select()

    return json(data)
}

export async function POST({ request }) {
    const info = await request.json();

    // const { error } = await supabase.from('voting').insert(emailData).select();
    await supabase.from('voting').update({ voting_preferences: info.voting_preferences }).eq('email', info.email).select()

    return json(true)
}