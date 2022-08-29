import axios from "axios";
import config from "@/config";

export const SearchAccounts = async (userId) => {
    return await axios.get(`${config.baseUrl}/account/mailAccounts/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        },
    })
}

export const AddAccount = async (credentials) => {
    return await axios.post(
        `${config.baseUrl}/account/addAccount`, credentials,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    )
}

export const DeleteAccount = async (id) => {
    return await axios.delete(
        `${config.baseUrl}/account/deleteAccount/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    )
}

