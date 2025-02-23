const DOMAIN_API = "http://localhost:3000/";

export const get = async (path, token = null) => {

    const headers = {};

    if(token)
    {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${DOMAIN_API}${path}`, {
        method: "GET",
        headers
    });

    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Invalid JSON response");
    }
}

export const post = async (path, data, token = null) => {

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }

    if(token)
    {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${DOMAIN_API}${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });
    
    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Invalid JSON response");
    }
}

export const patch = async (path, data, id, token = null) => {

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }

    if(token)
    {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${DOMAIN_API}${path}/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data)
    });
    
    if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Invalid JSON response");
    }
}


export const del = async (path, id, token = null) => {

    const headers = {};

    if(token)
    {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${DOMAIN_API}${path}/${id}`, {
        method: "DELETE",
        headers
    });

if (response.status === 401) {
        throw new Error("Unauthorized");
    }

    try {
        const result = response.json();  // đây là một Promise chứ không phải dữ liệu JSON ngay lập tức.
        return result;
    } catch (error) {
        throw new Error("Invalid JSON response");
    }
}
