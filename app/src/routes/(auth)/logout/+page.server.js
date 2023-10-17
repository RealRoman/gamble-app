/** @type {import('./$types').PageServerLoad} */
import { redirect } from '@sveltejs/kit'

export async function load(serverLoadEvent) {
    const { cookies, url } = serverLoadEvent
    const urlRedirect = url.searchParams.get('redirect') ?? '/'
    cookies.delete('token')
    throw redirect(303, urlRedirect)
}