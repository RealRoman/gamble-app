import { redirect } from "@sveltejs/kit";

export async function load(serverLoadEvent) {
    const { locals, cookies } = serverLoadEvent
    if (locals.user === null){
        throw redirect(302, '/login')
    }
    return {
        user: locals.user,
        token: cookies.get('token')
    }
}