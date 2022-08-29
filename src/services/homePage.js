import axios from "axios";
import config from "@/config";

export const ScheduledEmails = async (userId) => {
    return await axios.get(`${config.baseUrl}/email/ScheduledEmails/${userId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem('token')}`
        },
    })
}