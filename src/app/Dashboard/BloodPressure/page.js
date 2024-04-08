"use client"
import React from 'react'
import LineChart from './Graph';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

export default function BloodPressure(){
    return(
        <>
        <div className="bg-indigo-700 text-white font-semibold p-5">
            <div className="flex">
            <button className="mx-5">Back</button>
            <p>Blood Pressure</p>
            </div>
            <p className="text-center m-3 rounded-xl bg-indigo-500">
                {new Date().toISOString().slice('T')}
            </p>
        </div>
        <div className="m-5">
            <p>Last Record</p>
            <div className="last-record flex justify-between my-5 font-bold">
                <div className="text-center">
                    <p className="text-gray-700">Systolic</p>
                    <p className="text-xl">134</p>
                    <p>mmHg</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-700">Diastolic</p>
                    <p className="text-xl">76</p>
                    <p>mmHg</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-700">Pulse</p>
                    <p className="text-xl">70</p>
                    <p>BPM</p>
                </div>
            </div>
        </div>
        <div>
            <h1>My Chart</h1>
            <LineChart data={data} />
        </div>
        </>
    )
}