import type {LayoutLoad} from "../../../../../.svelte-kit/types/src/routes/(discovery)/[search]/$types";
import {error} from "@sveltejs/kit";

export const load : LayoutLoad = async ({parent,params,fetch}) =>{
    return {
        params
    }
}
