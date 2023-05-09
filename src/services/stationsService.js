import axios from "axios";

const baseURL = process.env.REACT_APP_STATIONS_SERVICE_BASE_URL

const getStations = async (userId) => {

    const stations = "/stations"
    const user = "/user"

    const getStationsURL = userId ? (`${baseURL + stations + user}/${userId}`) :  baseURL + stations

    return axios.get(getStationsURL)
        .then( (response) => {
            console.log(response);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export { getStations };
