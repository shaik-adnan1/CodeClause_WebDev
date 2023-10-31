import React, { useEffect, useState, useContext } from "react";
import { WeatherDataContext } from "../../context/weatherData.context";
import { fetchForeCastData } from "../../fetchData";
import LineChart from "./lineChart.component";

const ForecastChart = () => {
  const { weatherData } = useContext(WeatherDataContext);
  const { location } = weatherData; 
  const [forecastData, setForecastData] = useState(null);
//   const [options, setOptions] = useState({})

const options = {
    scales: {
      x: {
        ticks: {
          color: 'white', // Change the X-axis label color to red
        },
      },
      y: {
        ticks: {
          color: 'white', // Change the Y-axis label color to blue
        },
      },
    },
    plugins: {
        
        legend: {
          labels: {
            fontSize: 30,
            color: 'White', // Change the legend label color to green
          },
        },
      },
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { forecast } = await fetchForeCastData(location.name);
        const { forecastday } = forecast;
        const processedData = processForecastData(forecastday);
        setForecastData(processedData);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchData();
  }, [location]);

  const processForecastData = (forecastday) => {
    if (!forecastday) return null;

    const firstForecast = forecastday[0];
    if (!firstForecast || !firstForecast.hour) return null;

    const timeData = firstForecast.hour.map((hour, i) => {
      const dateObject = new Date(hour.time);
      const time = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      return i > 12 ? time + " PM" : time + " AM";
    });

    const temperatureData = firstForecast.hour.map((hour) => hour.temp_c);
    // const ctx = chartRef.current.getContext("2d");
    // let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    // gradient.addColorStop(0, "rgba(58, 123, 213, 1)")
    // gradient.addColorStop(1, "rgba(0, 210, 255, .3)")

    return {
      labels: timeData,
      datasets: [
        {
          label: "Hourly Weather",
          data: temperatureData,
          backgroundColor: ["rgba(28, 108, 220, 0.531)", "rrgba(28, 108, 220, 0.321)", "rgba(21, 93, 194, 0.175)"],
          borderColor: [
            'rgba(225, 225, 225, 1)'
          ],
          fill: true
        },
      ],
    };



  };

  return (
    <div>
      {forecastData ? (
        <div>
            <LineChart chartData={forecastData} options={options} />

        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ForecastChart;
