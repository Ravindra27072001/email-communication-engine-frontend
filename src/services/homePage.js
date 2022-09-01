import axios from "axios";

export const ScheduledEmails = async (userId) => {
    return await axios.get(`${process.env.VUE_APP_BASE_URL}/email/ScheduledEmails/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        },
    })
}