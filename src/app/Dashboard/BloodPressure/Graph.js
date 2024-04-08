"use client"
// components/LineChart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from 'react';
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const LineChart = ({ data }) => {
  return (
    <div>
      <Line 
        data={data} 
        options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020"
              },
              legend: {
                display: false
              }
            }
          }}
      />
    </div>
  );
};

export default LineChart;
