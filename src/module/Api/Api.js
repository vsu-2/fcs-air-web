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

    static async patchMe(json, token) {
        return await axios.patch(this.baseUrl + "/users/me/", json,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );
    }

    static async putMePassword(json, token){
        return await axios.put(this.baseUrl + "/users/me/password/2", json,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );
    }
}