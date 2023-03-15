import {error} from "@sveltejs/kit";

export const api_url = 'https://api-portfolio.gft.academy';
export const default_img = '\\src\\lib\\images\\icon-user.png';

async function send ({method, path, data, token}){
    const opts = { method, headers: {}};

    if(data){
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    if(token){
        opts.headers['Authorization'] = `Token ${token}`
    }

    const res = await fetch(`${api_url}/${path}`,opts);

    if(res.ok || res.status === 422){
        const text = await res.text();
        return text ? JSON.parse(text) :{};
    }

    throw error(res.status);
}

export function get(path, token){
    return send({method:'GET',path,token});
}

export function del (path, token){
    return send({method:'DELETE',path, token});
}

export function post (path, data, token){
    return send({method:'POST',path, data,token});
}

export function put (path, data, token){
    return send ({method:'PUT', path,data, token});
}






