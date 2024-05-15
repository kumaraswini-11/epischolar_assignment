import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {
  // Extracting country names, total earnings, total loan amounts, and total savings from the data
  const countryNames = data?.map((item) => item.country);
  const totalEarnings = data?.map((item) => item.totalEarnings);
  const totalLoanAmounts = data?.map((item) => item.totalLoanAmount);
  const totalSavings = data?.map((item) => item.totalSavings);

  const chartData = {
    labels: countryNames,
    datasets: [
      {
        label: "Total Earnings",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        data: totalEarnings,
      },
      {
        label: "Total Loan Amount",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: totalLoanAmounts,
      },
      {
        label: "Total Savings",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: totalSavings,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default Chart;
