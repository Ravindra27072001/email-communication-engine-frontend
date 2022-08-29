import axios from "axios";
import config from "@/config";



export const SendEmail = async (credentials) => {
    return await axios.post(
        `${config.baseUrl}/email/sendEmail`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    );
}