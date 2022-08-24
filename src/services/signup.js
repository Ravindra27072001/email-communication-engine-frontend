import axios from "axios";
import config from "@/config";


export const Signup = async (credentials) => {
    return await axios.post(
        `${config.baseUrl}/user/signup`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

