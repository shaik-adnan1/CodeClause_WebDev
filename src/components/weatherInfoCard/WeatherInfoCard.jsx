import "./WeatherInfoCard.style.scss";

import { useContext, useEffect, useState } from "react";
import { WeatherDataContext } from "../../context/weatherData.context";
import ForecastCard from "../foreCastCard/foreCastCard.component";
import ForecastChart from "../foreCastChart/forecastChart.component";
import LineChart from "../foreCastChart/lineChart.component";

// import { fetchIconData } from "../../fetchData";

const WeatherInfoCard = () => {
  const [mainWeatherIcon, setMainWeatherIcon] = useState("rainy");

  const { locationData, weatherData, padDates } =
    useContext(WeatherDataContext);
  // const { latitude, longitude } = locationData;
  const { location, current } = weatherData;
  // console.log(current && current)

  // const locationSearchHandler = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value)
  // }

  const currentDate = new Date();
  const fullDate = `${padDates(currentDate.getDay())}/${padDates(
    currentDate.getMonth()
  )}/${padDates(currentDate.getFullYear())}`;

  const time =
    padDates(currentDate.getHours()) + ":" + padDates(currentDate.getMinutes());

  // fetching icons data

  useEffect(() => {
    if (current) {
      const fetchWeatherIcon = async () => {
        try {
          const weatherText = current.condition.text.toLowerCase();
          const joinedText = weatherText.split(" ").join("-");
          await setMainWeatherIcon(joinedText); // Update mainWeatherIcon with the fetched icon data
        } catch (error) {
          console.error("Error fetching icon data:", error);
        }
        // console.log(location);
      };
      fetchWeatherIcon();
    }
  }, [current]);
  return (
    // useEffect(() => {
    // }, [weatherData])
    //

    <>
      {/* {current ? ( */}
      <div className="weatherInfoCard">
        <div className="infoContainer">
          <div className="mainWeatherData">
            <div className="current_data_time">
              <h3>Current weather</h3>
              <span>{fullDate} </span>
              <span>
                {time} {time > 12 ? "AM" : "PM"}
              </span>
            </div>
            <div className="weatherDetails">
              <div className="temp_main">
                <span>
                  <img
                    className="weatherIcon" // ${current.condition.text.toLowerCase()} mm m
                    src={require(`../../assets/weather_icons/${mainWeatherIcon}_${
                      current.is_day ? "day" : "night"
                    }.png`)}
                    alt=""
                  />
                </span>
                {/* <span>Image</span> */}
                <span className="current_temp">
                  {current.temp_c}
                  <sup>o</sup>
                  <span>C</span>
                </span>
              </div>
              <div className="temp_conditions">
                <p>{`Mostly ${current.condition.text}`}</p>
                <p>{`Feels like ${current.feelslike_c}`}</p>
              </div>
            </div>
            <p className="weather_description">
              {current &&
                `There will be mostly ${mainWeatherIcon} skies. The high will be ${current.temp_c}`}
              <sup>o</sup>C
            </p>
          </div>
          <div className="extra_details">
            <div className="w_details">
              <p>wind_kph</p>
              <p>{current.wind_kph} km/h</p>
            </div>
            <div className="w_details">
              <p>humidity</p>
              <p>{current.wind_kph} %</p>
            </div>
            <div className="w_details">
              <p>visibility</p>
              <p>{current.vis_km} km</p>
            </div>
            <div className="w_details">
              <p>pressure_in</p>
              <p>{current.pressure_in} mb</p>
            </div>
            <div className="w_details">
              <p>wind_degree</p>
              <p>
                {current.wind_degree} <sup>o</sup>
              </p>
            </div>
          </div>
        </div>
        <div className="forecast_main_container">
            <ForecastCard />
        </div>
      </div>

      <div className="forecastChart_container">
        {/* <LineChart /> */}
        <ForecastChart />
      </div>
      {/* ) : (
        <div>
          {" "}
          <p>data loading...</p>
        </div>
      )} */}
    </>
  );
};
export default WeatherInfoCard;
