import axios from "axios";
import { API_BASE_URL } from "src/config";

const passwordReset = async (email) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/password-reset/`, { email })
        console.log("EmailVerfication", response);
        return response
    } catch (error) {
        console.log(error);
    }

}


const passwordConfirm = async (password, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/password-reset/confirm/`, { password: password, token: token })
        // console.log("passwordResetConfirm", response);
        return response
    } catch (error) {
        console.log(error);
    }

}


export const loginService = {
    passwordReset: passwordReset,
    passwordConfirm:passwordConfirm,
}



