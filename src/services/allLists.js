import axios from "axios";
import config from "@/config";

export const SearchList = async (userId) => {
    return await axios.get(`${config.baseUrl}/list/allLists/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        },
    })
}

export const SearchUserEmail = async (id) => {
    // console.log("object", id);
    return await axios.get(`${config.baseUrl}/list/usersEmails/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        }
    })
}

export const AddUser = async (credentials) => {
    return await axios.post(`${config.baseUrl}/list/addUser`, credentials, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        },
    })
}



export const AddList = async (credentials) => {
    return await axios.post(
        `${config.baseUrl}/list/addList`, credentials,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    )
}

export const DeleteList = async (id) => {
    console.log("id", id);
    return await axios.delete(
        `${config.baseUrl}/list/deleteList/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    )
}


export const DeleteMember = async (id) => {
    return await axios.delete(
        `${config.baseUrl}/list/deleteMember/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    )
}


