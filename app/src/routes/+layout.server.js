/** @type {import('./$types').LayoutServerLoad} */
export async function load(serverLoadEvent) {
    const {locals, cookies} = serverLoadEvent
    return {
        user: locals.user,
        token : cookies.get('token')
    }
}