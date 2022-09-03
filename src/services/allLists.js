import axios from "axios";

export const SearchList = async (userId) => {
    return await axios.get(`${process.env.VUE_APP_BASE_URL}/list/allLists/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        },
    })
}

export const SearchUserEmail = async (id) => {
    return await axios.get(`${process.env.VUE_APP_BASE_URL}/list/usersEmails/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        }
    })
}

export const AddUser = async (credentials) => {
    return await axios.post(`${process.env.VUE_APP_BASE_URL}/list/addUser`, credentials, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        },
    })
}



export const AddList = async (credentials) => {
    return await axios.post(
        `${process.env.VUE_APP_BASE_URL}/list/addList`, credentials,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    )
}

export const DeleteList = async (id) => {
    return await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/list/deleteList/${id}`,
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
        `${process.env.VUE_APP_BASE_URL}/list/deleteMember/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    )
}


