import axios from "axios";

const baseURL = process.env.REACT_APP_STATIONS_SERVICE_BASE_URL

const apiClient = {

    getStations : async (jwt, onlyMyStations) => {
        const stations = "/stations"
        let getStationsURL =  baseURL + stations
        if(jwt && onlyMyStations) {
            getStationsURL = getStationsURL + "?onlyUserStations=true"
            console.log(jwt)
            return axios.get(getStationsURL, {
                headers: {
                    Authorization: jwt,
                },
            })
        }
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
        });
    },

    retrieveAvailableParameters : async (stationId) => {
        return axios.get(`${baseURL}/stations/${stationId}/availableparams`)
    }
}



export { apiClient };
