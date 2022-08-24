import axios from "axios";
import config from "@/config";

export const SearchList = async (userId) => {
    return await axios.get(`${config.baseUrl}/user/allLists/${userId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const SearchUserEmail = async (id) => {
    // console.log("object", id);
    return await axios.get(`${config.baseUrl}/user/usersEmails/${id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const AddUser = async (credentials) => {
    return await axios.post(`${config.baseUrl}/user/addUser`, credentials, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}



export const AddList = async (credentials) => {
    return await axios.post(
        `${config.baseUrl}/user/addList`, credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}

export const DeleteList = async (id) => {
    return await axios.delete(
        `${config.baseUrl}/user/deleteList/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}



