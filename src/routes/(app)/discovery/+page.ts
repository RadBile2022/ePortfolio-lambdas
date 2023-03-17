// import type {PageLoad} from "../../../../.svelte-kit/types/src/routes/$types";
// import { error } from "@sveltejs/kit";
// import {api_url} from "../../../lib/end-point";
// export const load: PageLoad = async ({ parent,fetch }) => {
//
//     const _parent = await parent();
//
//     const response = await fetch(api_url + "/api/users/all/" + _parent.user.id, ).then((_)=>{
//         if (_.ok) return _.json();
//         throw error(_.status, `activitiy =>${_.statusText}`);
//     });
//
//     return {
//         response
//     };
//     console.log('asdfkjsadfj')
//     console.log(response)
//
// };
