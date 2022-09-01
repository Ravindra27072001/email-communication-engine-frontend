import axios from "axios";

export const Signin = async (credentials) => {
    // console.log("object", process.env);
    return await axios.post(`${process.env.VUE_APP_BASE_URL}/user/signin`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            },
        }
    );
}

