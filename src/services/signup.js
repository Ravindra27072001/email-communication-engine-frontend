import axios from "axios";


export const Signup = async (credentials) => {
    return await axios.post(
        `${process.env.VUE_APP_BASE_URL}/user/signup`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

