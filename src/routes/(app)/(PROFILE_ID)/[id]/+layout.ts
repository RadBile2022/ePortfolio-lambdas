import type {LayoutLoad} from "../../../../../.svelte-kit/types/src/routes/(Modules)/project/[id]/$types";
import { error } from "@sveltejs/kit";
import {api_url} from "../../../../lib/end-point";
export const load: LayoutLoad = async ({ params,fetch }) => {
    const response = await fetch(api_url +"/api/users/" + params.id, ).then((_)=>{
        if (_.ok) return _.json();
        throw error(_.status, `activitiy =>${_.statusText}`);
    });
    return {
        ...params,
        response
    };
};
