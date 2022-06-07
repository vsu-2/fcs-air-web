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

    static async putMePassword(json, token) {
        return await axios.put(this.baseUrl + "/users/me/password/", json,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );
    }

    static async getGeoCities(title) {
        return await axios.get(this.baseUrl + "/geo/cities/?page=1&page_size=5&title__icontains=" + title, null,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    static async postTicketsSession(json) {
        console.log(json)
        return await axios.post(this.baseUrl + "/tickets/sessions/", json,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    static async getTicketsSessionsIdTickets(id, transfers, sliderTravelTimeMin, sliderTravelTimeMax,
                                             sliderStartTimeMax, sliderStartTimeMin,
                                             sliderEndTimeMax, sliderEndTimeMin,
                                             page, selectedAirlines,
                                             selectedAirports, selectedOffers) {
        let url = this.baseUrl + "/tickets/sessions/" + id + "/tickets/?"
        let isFirsEnable = false
        if (transfers.length !== 0) {
            isFirsEnable = true
            url += "transfers__in="
            for (let i = 0; i < transfers.length; i++) {
                if (i !== transfers.length - 1) {
                    url += transfers[i] + ","
                } else {
                    url += transfers[i]
                }
            }
        }

        if (sliderTravelTimeMin !== -1) {
            let minuts = Number(sliderTravelTimeMin)
            if (isFirsEnable) {
                url += "&"
            }
            isFirsEnable = true
            url += "travel_time__gte=" + this.getTime(minuts)
        }

        if (sliderTravelTimeMax !== -1) {
            let minuts = Number(sliderTravelTimeMax)
            if (isFirsEnable) {
                url += "&"
            }
            isFirsEnable = true
            url += "travel_time__lte=" + this.getTime(minuts)
        }

        if (isFirsEnable) {
            url += "&"
        }


        url += "start_time__lte=" + sliderStartTimeMax + ":00&" + "start_time__gte=" + sliderStartTimeMin + ":00&" +
            "end_time__lte=" + sliderEndTimeMax + ":00&" + "end_time__gte=" + sliderEndTimeMin + ":00"

        url += "&page=" + page + "&page_size=10"

        if (selectedAirlines.length !== 0) {
            url += "&airlines__in="
            for (let i = 0; i < selectedAirlines.length; i++) {
                if (i !== selectedAirlines.length - 1) {
                    url += selectedAirlines[i].id + ","
                } else {
                    url += selectedAirlines[i].id
                }
            }
        }

        if (selectedAirports.length !== 0) {
            url += "&airports__in="
            for (let i = 0; i < selectedAirports.length; i++) {
                if (i !== selectedAirports.length - 1) {
                    url += selectedAirports[i].id + ","
                } else {
                    url += selectedAirports[i].id
                }
            }
        }

        if (selectedOffers.length !== 0) {
            url += "&offers__in="
            for (let i = 0; i < selectedOffers.length; i++) {
                if (i !== selectedOffers.length - 1) {
                    url += selectedOffers[i].gate_id + ","
                } else {
                    url += selectedOffers[i].gate_id
                }
            }
        }

        return await axios.get(url, null,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    static async getTicketsSessionsIdFilters(id) {
        return await axios.get(this.baseUrl + "/tickets/sessions/" + id + "/filters/", null,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    static async getTicketsSessionsOffers(id, offer_id) {
        return await axios.get(this.baseUrl + "/tickets/sessions/" + id + "/offers/" + offer_id + "/link/", null,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }


    static getTime(minuts) {
        let day = Math.floor(minuts / (24 * 60))
        minuts -= day * 24 * 60
        let hour = Math.floor(minuts / 60)
        minuts -= hour * 60
        return day + " " + hour + ":" + minuts + ":00"
    }
}