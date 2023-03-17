import type {PageServerLoad, Actions} from "./$types";

import {redirect} from "@sveltejs/kit";

export const actions = {
    searching : async ({request}) =>{
        const data = await request.formData();
        const search = data.get('bangsat');


        throw redirect(303,`/discovery?search=${search}`)


    }
} satisfies Actions



// import type {PageLoad} from "../../../../.svelte-kit/types/src/routes/$types";
// import {api_url} from "../../../lib/end-point";

// export const load: PageLoad = async ({parent, params, fetch}) => {
//     const _parent = await parent();
//     const getUser = await fetch(`${api_url}/api/users/search/${_parent.user.userId}/`)
//
//     return {
//         _parent
//     }
// };




//
// export const actions = {
//     login: async({cookies, request,fetch})=>{
//         const data = await request.formData();
//
//         const email = data.get('email');
//         const password = data.get('password');
//         const user = await fetch(api_url + "/api/auth/login", {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             credentials: "include",
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         }).then((_) => {
//             if (_.ok) return _.json();
//             throw error(_.status, `activitiy =>${_.statusText}`);
//         });
//
//         // console.log(user)
//         const value = btoa(JSON.stringify(user));
//         // console.log(value)
//
//         cookies.set('token', value,{secure:!dev});
//         throw redirect(302,'/home');
//
//
//         // @ts-ignore
//         return {
//             success : true,
//
//         }
//
//
//     },
//     register : async ({})=>{
//
//     }
//
//
// } satisfies Actions;
