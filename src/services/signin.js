import axios from "axios";

export const Signin = async (credentials) => {
    return await axios.post(`${process.env.VUE_APP_BASE_URL}/user/signin`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            },
        }
    );
}
