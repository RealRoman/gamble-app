/** @type {import('@sveltejs/kit').Handle} */
import { authenticateUser } from './lib/server/auth';
export async function handle({ event, resolve }) {
	
    event.locals.user = await authenticateUser(event)
	const response = await resolve(event);
	return response;
}