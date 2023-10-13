/** @type {import('./$types').LayoutServerLoad} */
export async function load(serverLoadEvent) {
    const {locals} = serverLoadEvent
    return {
        user: locals.user
    }
}