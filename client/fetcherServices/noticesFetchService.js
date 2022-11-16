import { fetchDelete, fetchGet } from "../utils/fetchers";

export const fetchNoticesService = async (query) =>{
    try {
        const url_endpoint = `/api/v1/notices?${query}`;
        const notices = await fetchGet(url_endpoint);
        return notices;
    } catch (error) {
        return error;
    }
}


export const fetchNoticesDeleteService = async (notice_id) =>{
    try {
        const url_endpoint = `/api/v1/notices/${notice_id}`;
        const notices = await fetchDelete(url_endpoint);
        return notices;
    } catch (error) {
        return error;
    }
}




