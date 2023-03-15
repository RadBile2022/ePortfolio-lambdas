// import {fail, redirect} from "@sveltejs/kit";
// import * as api from '$lib/end-point';
// import {api_url} from "$lib/end-point";
// /** @type {import('./$types').PageServerLoad} */
// export async function load ({parent}){
//     const {user} = await parent();
//     console.log(user)
//     if (user) throw redirect(307,'/home');
// }
//
// export const actions = {
//     default : async ({cookies, request}) =>{
//         const data = await request.formData();
//
//         const block = {
//             title : data.get('title'),
//             desc : data.get('desc')
//         }
//
//
//     }
// }
//
// async function update() {
//     let response;
//
//     let newBlock = { title, desc };
//     blocks.push(newBlock);
//
//     response = await fetch(api_url + "/api/users/" + userId, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             userId: userId,
//             blockProfile: blocks,
//             // about: desc,
//         }),
//     });
//     console.log(desc)
//
//     if (!response.ok) {
//         alert(response.statusText);
//         console.log(response.status);
//         console.log(response.statusText);
//     } else {
//         const data = await response.json();
//         document.location.href = "/profile";
//     }
// }
