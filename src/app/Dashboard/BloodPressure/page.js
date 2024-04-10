"use client";
import React from "react";
import LineChart from "./Graph";
import Link from 'next/link'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const data = {
  labels: ["02-04", "03-04", "04-04", "05-04", "06-04", "07-04", "08-04"],
  datasets: [
    {
      label: "Systolic",
      data: [125, 127, 125, 130, 134, 130, 127],
      fill: false,
      borderColor: "red",
      tension: 0.1,
    },
    {
      label: "Diastolic",
      data: [74, 76, 74, 78, 80, 78, 74],
      fill: false,
      borderColor: "orange",
      tension: 0.1,
    },
  ],
};

export default function BloodPressure() {
  return (
    <>
      <div className="bg-indigo-700 text-white font-semibold p-3">
        <div className="flex">
          <Link href="/Dashboard">
            <button className="mx-5 text-xl hover:text-indigo-700 hover:bg-white rounded-full p-1">&#60;-</button>
          </Link>
          <div>
            <p className="p-1">Blood Pressure</p>
          </div>
        </div>
        <p className="text-center m-3 rounded-xl bg-indigo-500">
          {/* {new Date().toISOString().slice("T")} */}
        </p>
      </div>
      <div className="md:flex md:flex-row flex-col">
        <div className="m-5 md:w-1/2">
          <div className="flex flex-col justify-center rounded-md bg-indigo-700 p-5 text-white">
            <h1 className="text-xl text-center">Last Record</h1>
            <div className="last-record flex justify-between my-5 font-bold">
              <div className="text-center">
                <p className="text-gray-100">Systolic</p>
                <p className="text-xl">134</p>
                <p>mmHg</p>
              </div>
              <div className="text-center">
                <p className="text-gray-100">Diastolic</p>
                <p className="text-xl">76</p>
                <p>mmHg</p>
              </div>
              <div className="text-center">
                <p className="text-gray-100">Pulse</p>
                <p className="text-xl">70</p>
                <p>BPM</p>
              </div>
            </div>
            <button className="p-2 bg-orange-500 text-white font-semibold hover:bg-white hover:text-orange-600 border-2 border-orange-600">
              VIEW ALL
            </button>
          </div>
          <div>
            <h1 className="text-xl text-center m-5">ADD NEW RECORD</h1>
            <div className="new-record my-5 mx-10 flex justify-between space-x-5">
              <div className="w-1/3 text-center">
                <label className="text-gray-900">Systolic (mmHg)</label> <br />
                <input
                  className="text-xl p-3 outline-none shadow-lg shadow-black w-20 h-20"
                  type="number"
                />
              </div>
              <div className="w-1/3 text-center">
                <label className="text-gray-900">Diastolic (mmHg)</label> <br />
                <input
                  className="text-xl p-3 outline-none shadow-lg shadow-black w-20 h-20"
                  type="number"
                />
              </div>
              <div className="w-1/3 text-center">
                <label className="text-gray-900">Pulse (BPM)</label> <br />
                <input
                  className="text-xl p-3 outline-none shadow-lg shadow-black w-20 h-20"
                  type="number"
                />
              </div>
            </div>
            <div className="flex justify-center">
                <button className="bg-orange-600 text-white p-2 hover:bg-white hover:text-orange-600 border-2 border-orange-600">ADD</button>
            </div>
          </div>
        </div>
        <div className="md:m-5 md:w-1/2">
          <h1 className="mx-10 text-center text-lg">My Chart</h1>
          <LineChart data={data} />
        </div>
      </div>
    </>
  );
}
