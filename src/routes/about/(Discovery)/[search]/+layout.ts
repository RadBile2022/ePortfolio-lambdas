import type {LayoutLoad} from "../../../../.svelte-kit/types/src/routes/(Modules)/project/[id]/$types";
import {error} from "@sveltejs/kit";
import {api_url} from "../../../lib/end-point";

export const load : LayoutLoad = async ({parent,params,fetch}) =>{
    return {
        params
    }
}
