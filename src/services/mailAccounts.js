import axios from "axios";

export const SearchAccounts = async (userId) => {
    return await axios.get(`${process.env.VUE_APP_BASE_URL}/account/mailAccounts/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        },
    })
}

export const AddAccount = async (credentials) => {
    return await axios.post(
        `${process.env.VUE_APP_BASE_URL}/account/addAccount`, credentials,
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
        `${process.env.VUE_APP_BASE_URL}/account/deleteAccount/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    )
}

