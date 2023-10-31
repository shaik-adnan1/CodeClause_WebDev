import { useContext, useEffect, useState } from "react";
import "./App.scss";

import WeatherInfoCard from "./components/weatherInfoCard/WeatherInfoCard";
import { WeatherDataContext } from "./context/weatherData.context";

import { Dna, Bars } from "react-loader-spinner";

// require('dotenv').config();

const App = () => {
  // console.log(process.env.REACT_APP_API_KEY);

  const { weatherData } = useContext(WeatherDataContext);
  const { current } = weatherData;
  const [isDay, setIsDay] = useState(false);
  const container = document.querySelector(".app_container");
  useEffect(() => {
    if (current) {
      current.is_day ? setIsDay(true) : setIsDay(false);
    }

  }, [current]);

  return (
    <>
      {current ? (
        <main
          className={`app_container ${isDay ? "day" : "night"}`} // { backgroundImage: `url(${backgroundImage})` }
          // style={{
          //   backgroundImage: `url(/assets/images/${
          //     isDay ? "day" : "night"
          //   }_bg.jpg)`,
          // }}
        >
          <WeatherInfoCard />
        </main>
      ) : (
        <p className='loading_spinner'>
          <Dna
            visible={true}
            height='100'
            width='100'
            ariaLabel='dna-loading'
            wrapperStyle={{}}
            wrapperClass='dna-wrapper'
          />
          {/* <Bars
            height='80'
            width='80'
            color=' rgba(23, 87, 206, 0.605)'
            ariaLabel='bars-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          /> */}
        </p>
      )}
    </>
  );
};

export default App;
