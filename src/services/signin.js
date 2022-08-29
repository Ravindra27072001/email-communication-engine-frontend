import axios from "axios";
import config from "@/config";

export const Signin = async (credentials) => {
    return await axios.post(`${config.baseUrl}/user/signin`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            },
        }
    );
}

