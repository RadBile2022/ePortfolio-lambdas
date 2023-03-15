import {error} from "@sveltejs/kit";
import {api_url} from "../../../lib/end-point";
import type {PageServerLoad, Actions} from "./$types";
import {redirect} from "@sveltejs/kit";
import {dev} from "$app/environment";

// export const load = (async ({locals})=>{
//     if(locals.user) throw  redirect(307,'/');
// }) satisfies PageServerLoad;
//

export const actions = {
    login: async({cookies, request,fetch})=>{
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');
        const user = await fetch(api_url + "/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        }).then((_) => {
            if (_.ok) return _.json();
            throw error(_.status, `activitiy =>${_.statusText}`);
        });

        // console.log(user)
        const value = btoa(JSON.stringify(user));
        // console.log(value)

        cookies.set('token', value,{secure:!dev});
        throw redirect(302,'/home');


        // @ts-ignore
        return {
            success : true,

        }


    }



} satisfies Actions;


// export const load = (async ({cookies})=>{
//     const user = await cookies.get('token');
//     return {user};
//     console.log(cookies.get('token'))
// }) satisfies PageServerLoad;


// const user = await fetch(api_url + "/api/auth/login", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     credentials: "include",
//     body: JSON.stringify({
//         email,
//         password,
//     }),
// }).then((_) => {
//     if (_.ok) return _.json();
//     throw error(_.status, `activitiy =>${_.statusText}`);
// });
