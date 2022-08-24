import axios from "axios";
import config from "@/config";


export const VerifyOTP = async (credentials) => {
    return await axios.post(
        `${config.baseUrl}/user/verifyOTP`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

