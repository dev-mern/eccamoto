import { fetchGet } from "../utils/fetchers";

// login user by email, password
export const fetchSlipList = async (queryString) =>{
    try {
        const url_endpoint = `/api/v1/survey/slips?${queryString}`;
        return await fetchGet(url_endpoint);
    } catch (error) {
        return error;
    }
}
