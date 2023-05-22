import axios from "axios";

const baseURL = process.env.REACT_APP_STATIONS_SERVICE_BASE_URL

const apiClient = {

    getStations : async (jwt) => {
        const stations = "/stations"
        let getStationsURL =  baseURL + stations
        if(jwt) {
            getStationsURL = getStationsURL + "?onlyUserStations=true"
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
}



export { apiClient };
