import axios from "axios";

const baseURL = process.env.REACT_APP_STATIONS_SERVICE_BASE_URL

const apiClient = {

    getStations : async (jwt, onlyMyStations) => {
        const stations = "/stations"
        let getStationsURL =  baseURL + stations
        if(jwt && onlyMyStations) {
            getStationsURL = getStationsURL + "?onlyUserStations=true"
            return axios.get(getStationsURL, {
                headers: {
                    Authorization: jwt,
                },
            })
        }
        return axios.get(getStationsURL)
    },

    getStation : async (stationId) => {
        const stations = "/stations"
        let getStationsURL =  baseURL + stations + "/" + stationId
        return axios.get(getStationsURL)
    },

    login: (body) => {
        return axios.post(`${baseURL}/users/login`, body);
    },

    retrieveHistory : async (stationId, fromDate, toDate, parameter) => {
        return axios.get(`${baseURL}/stations/${stationId}/history`, {
            params: {
                fromDate,
                toDate,
                parameter
            }
        })
    },


}



export { apiClient };
