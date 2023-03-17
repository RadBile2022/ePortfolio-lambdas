import {api_url} from "$lib/end-point.js";




/** @type {import('./$types').Actions} */
export const actions = {
    // allUsers: async ({locals, params, request, fetch}) => {
    //     const response = await fetch(
    //         api_url + `/api/users/all/${locals.user.userId}`
    //     );
    //
    //     if (!response.ok) {
    //         console.log(response.status);
    //     }
    //
    //     const allUsers = await response.json();
    //
    //     return {
    //         allUsers
    //     }
    // },
    searchingUsers: async ({locals, request, fetch}) => {

        const data = await request.formData();
        const searchKeyword = data.get('search');

        const response = await fetch(
            api_url + `/api/users/search/${locals.user.userId}/${searchKeyword}`
        );

        if (!response.ok) {
            console.log(response.status);
        }

        const findUsers = await response.json();
        return {
            findUsers
        }
    },
    allPosts: async ({locals, request, fetch}) => {
        const data = await request.formData();
        const searchKeyword = data.get('search');

        const response = await fetch(
            api_url + `/api/posts/search/${searchKeyword}`
        );

        if (!response.ok) {
            alert(response.status);
        }
        /**
         * @type {any[]}
         */
        let postAll = [];
        const datas = await response.json();
        datas.forEach((/** @type {{ isPublic: boolean; userId: any; }} */ element) => {
            // filter private post
            if (element.isPublic == false && element.userId != locals.user.userId) {
            } else {
                postAll.push(element);
            }
        });

        return {
            postAll
        }
    },
    allArticles: async ({locals, request, fetch}) => {
        const data = await request.formData();
        const searchKeyword = data.get('search');

        const response = await fetch(
            api_url + `/api/articles/search/${searchKeyword}`
        );

        if (!response.ok) {
            // alert(response.status);
            console.log(response.status);
        }
        /**
         * @type {any[]}
         */
        let articleAll = [];
        const datas = await response.json();
        datas.forEach((element) => {
            // filter private article
            if (element.isPublic == false && element.userId != locals.user.userId) {
            } else {
                articleAll.push(element);
            }
        });

        return {
            articleAll
        }
    },
    allActivites: async ({locals, request, fetch}) => {
        const data = await request.formData();
        const searchKeyword = data.get('search');

        const response = await fetch(
            `${api_url}/api/activities/search/${searchKeyword}`
        );

        if (!response.ok) {
            // alert(response.status);
            console.log(response.status);
        }
        /**
         * @type {any[]}
         */
        let activityAll = [];
        const datas = await response.json();
        datas.forEach((element) => {
            // filter private article
            if (element.isPublic == false && element.userId != locals.user.userId) {
            } else {
                activityAll.push(element);
            }
        });

        return {
            activityAll
        }
    }
    ,
    allProject: async ({locals, request, fetch}) => {
        const data = await request.formData();
        const searchKeyword = data.get('search');

        const response = await fetch(
            `${api_url}/api/projects/search/${searchKeyword}`
        );

        if (!response.ok) {
            // alert(response.status);
            console.log(response.status);
        }
        /**
         * @type {any[]}
         */
        let projectAll = [];
        const datas = await response.json();
        datas.forEach((element) => {
            // filter private article
            if (element.isPublic == false && element.userId != locals.user.userId) {
            } else {
                projectAll.push(element);
            }
        });

        return {
            projectAll
        }


    }
}
