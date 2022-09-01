import axios from "axios";


export const ResendOTPVerification = async (credentials) => {
    return await axios.post(`${process.env.VUE_APP_BASE_URL}/verification/resendOTPVerification`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

