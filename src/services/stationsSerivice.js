import { getAllStations } from "./mockedOrionService";

// este servicio mapea lo que nos venga de orion a lo que vamos a mostrar en los mapas
const getStations = async (userId) => {
  let stations = await getAllStations(userId);

  if (stations) {
    return Promise.resolve(
      stations.map((station) => ({
        name: station.address.streetAddress,
        temperature: station.temperature,
        reliability: station.reliability,
        pm1: station.pm1,
        pm10: station.pm10,
        pm25: station.pm25,
        coordinates: {
          latitude: station.location.coordinates[0],
          longitude: station.location.coordinates[1],
        },
      }))
    );
  }
};

export { getStations };
