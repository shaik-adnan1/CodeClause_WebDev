import "./foreCastCard.style.scss";
import { useContext, useState } from "react";

import { WeatherDataContext } from "../../context/weatherData.context";
import { fetchForeCastData } from "../../fetchData";
import { useEffect } from "react";

import { Puff, Triangle } from "react-loader-spinner";
// import { BsFillDropletFill } from "react-icons/bs";

const ForecastCard = () => {
  // getting three days of forecast dates

  // Get the current date
  const currentDate = new Date();

  // Initialize an array to store the next three days' data
  const nextTwoDays = [];

  // Loop to get the next three days
  for (let i = 1; i <= 2; i++) {
    // Calculate the date for the next day
    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + i);

    // Format the day and date
    const day = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"][
      nextDate.getDay()
    ];
    const date = nextDate.getDate();

    // Create a string in "day date" format
    const dayDate = `${day} ${date}`;

    // Add the day and date to the array
    nextTwoDays.push(dayDate);
  }

  // Output the next three days' data
  // console.log(nextTwoDays);

  const [foreCast, setForeCast] = useState(null);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  const { weatherData } = useContext(WeatherDataContext);

  const { location, current } = weatherData;
  const conditionText = current.condition.text;
  //   const currentDate = new Date();
  const dateFormat = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const fetchWeatherIcon = conditionsText => {
    try {
      const text = conditionsText.toLowerCase();
      const joinedText = text.split(" ").join("-");
      return joinedText; // Update mainWeatherIcon with the fetched icon data
    } catch (error) {
      console.error("Error fetching icon data:", error);
    }
    // console.log(location);
  };
    useEffect(() => {
      (async () => {
        const { forecast } = await fetchForeCastData(location.name);
        const { forecastday } = forecast;
        setForeCast(forecastday);
      })();
    }, [location]);

  

  return (
    <>
      {foreCast ? (
        <div className='forecast_container'>
          {foreCast.map((cur, i) => {
            // console.log(foreCast);
            return (
              <div key={i} className='forecastCard'>
                <div className='forecast_details'>
                  <span>
                    <p>
                      {dateFormat === cur.date ? "Today" : nextTwoDays[i - 1]}
                    </p>
                    <img
                      className='forecast_icon'
                      src={require(`../../assets/weather_icons/${fetchWeatherIcon(
                        cur.day.condition.text
                      )}_day.png`)}
                      alt=''
                    />
                  </span>
                  <span>
                    <p>
                      {cur.day.maxtemp_c}
                      <sup>o</sup>C
                    </p>
                    <p>
                      {cur.day.mintemp_c} <sup>o</sup>C
                    </p>
                  </span>
                </div>
                <div className='forecast_conditions'>
                  <p>
                    {cur.day.condition.text === "sunny"
                      ? "Mostly Sunny"
                      : cur.day.condition.text}
                  </p>
                  <p>
                    humidity <i className='bi bi-droplet-fill'></i>{" "}
                    {cur.day.avghumidity}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // <Puff
        //   height='80'
        //   width='80'
        //   radius={1}
        //   color='#4fa94d'
        //   ariaLabel='puff-loading'
        //   wrapperStyle={{}}
        //   wrapperClass=''
        //   visible={true}
        // />
        <div className='spinner'>
          <Triangle
            height='80'
            width='80'
            color='#fff'
            ariaLabel='triangle-loading'
            wrapperStyle={{}}
            wrapperClassName=''
            visible={true}
          />
        </div>
      )}
    </>
  );
};

export default ForecastCard;
