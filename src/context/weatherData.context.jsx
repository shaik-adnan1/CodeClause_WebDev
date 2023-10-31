import { createContext, useEffect, useState } from "react";

import { fetchData } from "../fetchData";

export const WeatherDataContext = createContext({
  locationData: null,
  weatherData: null,
  padDates: () => null
});

const padDates = (num) => {
  return num.toString().padStart(2, '0');
}

// fetch weather data based on location

export const WeatherDataProvider = ({ children }) => {
  const [locationData, setLocationData] = useState({});
    const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchLocation = async () => {
      await navigator.geolocation.getCurrentPosition(
        pos => {
          // Handle successful geolocation here
          setLocationData(pos.coords);
        },
        err => {
          // Handle geolocation error here
          setLocationData(err);
        }
      );
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const { latitude, longitude } = locationData;

    const getFetchedData = async () => {

      const data = latitude && await fetchData(latitude.toFixed(2), longitude.toFixed(2)) || "Loading...";
      // setlocationDataLocation(data);
      setWeatherData(data)
    };

    getFetchedData();
  }, [locationData]);

  // fetch location's weather data

  // useEffect(() => {
  //     const Wdata = fetchLocation().then(res => res.json()).then(data => data).catch(err => console.log(err))
  //     // setlocationData(Wdata);
  //     console.log(Wdata);
  // }, []);

  const value = {
    locationData,
    weatherData,
    padDates
  };

  return (
    <WeatherDataContext.Provider value={value}>
      {children}
    </WeatherDataContext.Provider>
  );
};
