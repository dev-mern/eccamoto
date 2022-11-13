import { fetchGet } from "../utils/fetchers";

// login user by email, password
export const fetchASummaryCard = async (userID) =>{
    try {
        const url_endpoint = `/api/v1/card/${userID}`;
        const card = await fetchGet(url_endpoint);
        return card;
    } catch (error) {
        return error;
    }
}

