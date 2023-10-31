import { Bar, Line, Bubble, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData, options }) => {
  return <Line style={{marginTop: 20}} height={250} width={1000} data={chartData} options={options}/>;
};
export default LineChart;
