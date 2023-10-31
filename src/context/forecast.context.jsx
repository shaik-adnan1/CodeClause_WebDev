// import { createContext, useState, useEffect, useContext } from "react";

// import { WeatherDataContext } from "./weatherData.context";
// import { fetchForeCastData } from "../fetchData";

// export const ForecastContext = createContext({
//   foreCast: null,
// });

// export const ForecastProvider = ({ children }) => {
//   const { weatherData } = useContext(WeatherDataContext);
//   const { location , current} = weatherData;

//   const [foreCast, setForeCast] = useState(null);

//   useEffect(() => {
//         (async () => {
//             const { forecast } = await fetchForeCastData(location.name);
//             const { forecastday } = forecast;
//             setForeCast(forecastday);
//             console.log(foreCast)
//           })();
    
//   }, [weatherData]);

//   const value = {
//     foreCast,
//   };

//   return (
//     <ForecastContext.Provider value={value}>
//       {children}
//     </ForecastContext.Provider>
//   );
// };
