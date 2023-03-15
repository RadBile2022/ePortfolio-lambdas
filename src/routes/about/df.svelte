// import type { PageLoad} from "./$types";
// import { error} from "@sveltejs/kit";
// import {api_url} from "../../../../../lib/end-point";
//
// export const load:PageLoad = async ({params,fetch}) =>{
//     const response = await fetch (api_url + "/api/users/" + params.id).then((_)=>{
//         if (_.ok) return _.json();
//         throw error(_.status, `activity =>${_.statusText}`);
//     });
//
//     return {
//         ...params,
//         response
//     }
// }
