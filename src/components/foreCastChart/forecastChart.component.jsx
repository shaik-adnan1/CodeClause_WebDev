import React, { useEffect, useState, useContext } from "react";
import { WeatherDataContext } from "../../context/weatherData.context";
import { fetchForeCastData } from "../../fetchData";
import LineChart from "./lineChart.component";

const ForecastChart = () => {
  const { weatherData } = useContext(WeatherDataContext);
  const { location, current } = weatherData;
  const [forecastData, setForecastData] = useState(null);
  //   const [options, setOptions] = useState({})
  const createGradientBackground = ctx => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(255, 69, 0, 1)"); // Red-Orange
    gradient.addColorStop(1, "rgba(255, 255, 255, 1)"); // White

    return gradient;
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: current && current.is_day === 1 ? "black" : "white",
        },
      },
      y: {
        ticks: {
          color: current && current.is_day === 1 ? "black" : "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 30,
          color: current && current.is_day === 1 ? "black" : "white",
        },
      },
      filler: {
        propagate: false,
      },
    },
    elements: {
      point: {
        radius: 5,
      },
    },
    pointHitRadius: 30,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { forecast } = await fetchForeCastData(location.name);
        const { forecastday } = forecast;
        const processedData = processForecastData(forecastday);
        setForecastData(processedData);
        console.log(current.is_day);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchData();
  }, [location]);

  const processForecastData = forecastday => {
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

    const temperatureData = firstForecast.hour.map(hour => hour.temp_c);
    // const ctx = chartRef.current.getContext("2d");
    // let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    // gradient.addColorStop(0, "rgba(58, 123, 213, 1)")
    // gradient.addColorStop(1, "rgba(0, 210, 255, .3)")

    return {
      labels: timeData,
      datasets: [
        {
          label: "TODAY'S FORECAST",
          data: temperatureData,
          backgroundColor:
            current.is_day === 1
              ? "rgba(232, 84, 47, 0.532)"
              : "rgba(0, 210, 255, .3)",
          borderColor: ["rgba(225, 225, 225, 1)"],
          fill: true,
        },
      ],
    };
  };

  return (
    <div>
      {forecastData ? (
        <div>
          <LineChart
            chartData={forecastData}
            options={{
              ...options,
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ForecastChart;
