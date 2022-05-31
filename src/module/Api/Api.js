import axios from "axios";

export default class Api {
    static baseUrl = "https://vsu-fcs-air-api.herokuapp.com"

    static async postRegister(json) {
        return await axios.post(this.baseUrl + "/users/register/", json,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    static async postLogin(json) {
        return await axios.post(this.baseUrl + "/users/token/", json,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    static async getMe(token) {
        console.log(token)
        return await axios.get(this.baseUrl + "/users/me", {
                headers: {
                    'Authorization': token
                }
            }
        );
    }
}