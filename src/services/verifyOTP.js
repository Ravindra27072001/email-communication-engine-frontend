import axios from "axios";


export const VerifyOTP = async (credentials) => {
    return await axios.post(
        `${process.env.VUE_APP_BASE_URL}/verification/verifyOTP`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}

