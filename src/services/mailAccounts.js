import axios from "axios";
import config from "@/config";

export const SearchAccounts = async (userId) => {
    return await axios.get(`${config.baseUrl}/user/mailAccounts/${userId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const AddAccount = async (credentials) => {
    return await axios.post(
        `${config.baseUrl}/user/addAccount`, credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}

export const DeleteAccount = async (id) => {
    return await axios.delete(
        `${config.baseUrl}/user/deleteAccount/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}

