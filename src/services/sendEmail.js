import axios from "axios";



export const SendEmail = async (credentials) => {
    return await axios.post(
        `${process.env.VUE_APP_BASE_URL}/email/sendEmail`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    );
}

export const SendEmailIndividual = async (credentials) => {
    return await axios.post(
        `${process.env.VUE_APP_BASE_URL}/email/sendEmailIndividual`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`
            },
        }
    );
}

