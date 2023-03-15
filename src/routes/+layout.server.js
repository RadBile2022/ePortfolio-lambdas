/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
    return {
        user: locals.user && {
            userId: locals.user.userId,
            jwt : locals.user.jwt
        }
    };

}
// // @ts-ignore
// import type { LayoutServerLoad } from './$types';
//
// export const load = (async () => {
//     return {
//         user : locals.user &&{
//             userId : locals.user.userId,
//             jwt : locals.user.jwt,
//
//         }
//     }
// }) satisfies LayoutServerLoad;

// import type {LayoutServerData} from "../../.svelte-kit/types/src/routes/$types";
//
// export const load = (async ()=> {
//     return {
//         user : locals.user &&{
//             userId : locals.user.userId,
//             jwt : locals.user.jwt,
//
//         }
//     }
// } satisfies LayoutServerData
