"use client"
// components/LineChart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from 'react';
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const SugarChart = ({ data }) => {
  return (
    <div className="mx-10">
      <Line 
        data={data} 
        options={{
            plugins: {
              title: {
                display: true,
                text: "Last Ten Blood Sugar Readings"
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

export default SugarChart;
