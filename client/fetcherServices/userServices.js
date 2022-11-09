import { fetchGet, fetchPost } from "../utils/fetchers"

// login by cookie credentials
export const loggedInWithCredential = async () =>{
    try {
        return await fetchGet("/api/v1/auth/login");
    } catch (error) {
        return error;
    }
}

// login user by email, password
export const loggedInByEmailPass = async (body) =>{
    try {
        const url_endpoint = "/api/v1/auth/login";
        return await fetchPost(url_endpoint,body);
    } catch (error) {
        return error;
    }
}

// logut User
export const logOutByClearCookie = async () =>{
    try {
        const url_endpoint = "/api/v1/auth/logout";
        return await fetchGet(url_endpoint);
    } catch (error) {
        return error;
    }
}
