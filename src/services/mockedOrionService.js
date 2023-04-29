const fakeStations = [
  {
    id: "BuenosAires-AmbientObserved-28079004-2016-03-15T11:00:00",
    type: "AirQualityObserved",
    address: {
      addressCountry: "AR",
      addressLocality: "BsAs",
      streetAddress: "Obelisco",
    },
    dateObserved: "2016-03-15T11:00:00/2016-03-15T12:00:00",
    areaServed: "Brooklands",
    location: {
      type: "Point",
      coordinates: [-34.60373993852875, -58.38159239403079],
    },
    source: "http://datos.madrid.es",
    typeOfLocation: "outdoor",
    precipitation: 0,
    relativeHumidity: 0.54,
    temperature: 12.2,
    windDirection: 176,
    windSpeed: 0.64,
    airQualityLevel: "moderate",
    airQualityIndex: 65,
    reliability: 0.7,
    co: 500,
    no: 45,
    co2: 69,
    nox: 139,
    so2: 11,
    pm1: 16,
    pm10: 23,
    pm25: 75,
    coLevel: "moderate",
    refPointOfInterest: "28079004-Pza.deEspanya",
    userId: 1,
  },
  {
    id: "Rosario-AmbientObserved-28079004-2016-03-15T11:00:00",
    type: "AirQualityObserved",
    address: {
      addressCountry: "AR",
      addressLocality: "Rosario",
      streetAddress: "Monumento Bandera",
    },
    dateObserved: "2016-03-15T11:00:00/2016-03-15T12:00:00",
    areaServed: "Brooklands",
    location: {
      type: "Point",
      coordinates: [-32.94761935206627, -60.63060378270985],
    },
    source: "http://datos.madrid.es",
    typeOfLocation: "outdoor",
    precipitation: 0,
    relativeHumidity: 0.54,
    temperature: 12.2,
    windDirection: 176,
    windSpeed: 0.64,
    airQualityLevel: "moderate",
    airQualityIndex: 65,
    reliability: 0.7,
    co: 500,
    no: 45,
    co2: 69,
    nox: 139,
    so2: 11,
    pm1: 20,
    pm10: 41,
    pm25: 55,
    coLevel: "moderate",
    refPointOfInterest: "28079004-Pza.deEspanya",
    userId: 1,
  },
  {
    id: "LaPlata-AmbientObserved-28079004-2016-03-15T11:00:00",
    type: "AirQualityObserved",
    address: {
      addressCountry: "AR",
      addressLocality: "La Plata",
      streetAddress: "Plaza Moreno",
    },
    dateObserved: "2016-03-15T11:00:00/2016-03-15T12:00:00",
    areaServed: "Brooklands",
    location: {
      type: "Point",
      coordinates: [-34.9211576361776, -57.95454891322338],
    },
    source: "http://datos.madrid.es",
    typeOfLocation: "outdoor",
    precipitation: 0,
    relativeHumidity: 0.54,
    temperature: 12.2,
    windDirection: 176,
    windSpeed: 0.64,
    airQualityLevel: "moderate",
    airQualityIndex: 65,
    reliability: 0.7,
    co: 500,
    no: 45,
    co2: 69,
    nox: 139,
    so2: 11,
    pm1: 10,
    pm10: 31,
    pm25: 25,
    coLevel: "moderate",
    refPointOfInterest: "28079004-Pza.deEspanya",
    userId: 2,
  },
];

const getAllStations = (userId) => {
  if (userId) {
    // si existiera la manera de pedir a orion las estaciones de un user sería ideal solo pedir esas y no filtrar
    const filteredStations = fakeStations.filter(
      (station) => station.userId === userId
    );
    return Promise.resolve(filteredStations);
  }
  return Promise.resolve(fakeStations);
};

export { getAllStations };
