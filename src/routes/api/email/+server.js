import { supabase } from "$lib/supabaseClient";
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const emailData = await request.json();

    // const { error } = await supabase.from('voting').insert(emailData).select();
    const { data } = await supabase.from('voting').select().eq('email', emailData.email)

    if (!data || data.length === 0 || !data[0].name || !data[0].is_presenting) {
        console.log("Email not yet created")
        await supabase.from('voting').insert({ email: emailData.email })
        return json({ "email_exists": false });
    }
    else {
        console.log("email already initialized")
        return json({ "email_exists": true });
    }
}