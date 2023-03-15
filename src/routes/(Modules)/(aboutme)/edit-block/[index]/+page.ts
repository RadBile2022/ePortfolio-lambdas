import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import {api_url} from "../../../../../lib/end-point";

export const load: PageLoad = async ({ parent, params,fetch }) => {
    const _parent = await parent();
    const response = await fetch(api_url + "/api/users/" + _parent.user.userId, ).then((_)=>{
        if (_.ok) return _.json();
        throw error(_.status, `activitiy =>${_.statusText}`);
    });
    return {
        response,
        params
    };
};
