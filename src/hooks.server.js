import {redirect} from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	const token = event.cookies.get('token');
	event.locals.user = token ? JSON.parse(atob(token)) : null;
	// console.log(JSON.parse(atob(token)))
	// console.log(event)
	return resolve(event);

	// throw redirect(302, "/signup");

}
