import axios from "axios";
import config from "@/config";


export const ResendOTPVerification = async (credentials) => {
    return await axios.post(`${config.baseUrl}/user/resendOTPVerification`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

