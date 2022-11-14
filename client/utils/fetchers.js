export const fetchPost = async (url,body={},headers) =>{
    if (!url) {
        return;
    }
    try {
        const fetchRes = await fetch(url,{
            method:"POST",
            credentials:"include",
            headers:{
                'content-type':'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        })
        const result = await fetchRes.json();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const fetchGet = async (url) =>{
    if (!url) {
        return;
    }
    try {
        const fetchRes = await fetch(url,{
            credentials:"include",
            method:"GET",
        })
        const result = await fetchRes.json();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const fetchDelete = async (url) =>{
    if (!url) {
        return;
    }
    try {
        const fetchRes = await fetch(url,{
            credentials:"include",
            method:"Delete",
        })
        const result = await fetchRes.json();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const fetchPatch = async (url,body={},headers) =>{
    if (!url) {
        return;
    }
    try {
        const fetchRes = await fetch(url,{
            method:"PATCH",
            credentials:"include",
            headers:{
                'content-type':'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        })
        const result = await fetchRes.json();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

