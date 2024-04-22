"use client";
import SugarChart from "./Chart";
import Link from "next/link";
import TodaysDate from "@/app/component/TodaysDate";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

import { useState } from "react";

const FSS = {
  labels: ["02-04", "03-04", "04-04", "05-04", "06-04", "07-04", "08-04"],
  datasets: [
    {
      label: "Fasting",
      data: [88, 82, 90, 95, 98, 93, 97],
      fill: false,
      borderColor: "red",
      tension: 0.1,
    },
  ],
};

const PPS = {
  labels: ["02-04", "03-04", "04-04", "05-04", "06-04", "07-04", "08-04"],
  datasets: [
    {
      label: "Postprandial",
      data: [104, 106, 104, 108, 100, 108, 104],
      fill: false,
      borderColor: "orange",
      tension: 0.1,
    },
  ],
};

const RS = {
  labels: ["02-04", "03-04", "04-04", "05-04", "06-04", "07-04", "08-04"],
  datasets: [
    {
      label: "Random",
      data: [114, 116, 114, 118, 110, 118, 114],
      fill: false,
      borderColor: "rgb(255,0,255)",
      tension: 0.1,
    },
  ],
};
export default function BloodSugar() {
  const [fasting, setFasting] = useState(90);
  const [postprandial, setPostprandial] = useState(120);
  const [random, setRandom] = useState(100);
  const [mgDL, setmgDL] = useState(true);

  const [testType, setTestType] = useState("");
  const [sugarValue, setSugarValue] = useState(0);

  const handleSelectChange = (event) => {
    setTestType(event.target.value);
  };

  const togglemgDL = () => {
    setmgDL((mgDL) => !mgDL);
  };
  const ConversionValue = 18.01;

  const handleSubmit = async (e) => {
    e.preventDefault()
    let dateString = new Date().toISOString()
    const userID = await localStorage.getItem("userID");
    const sugarObj = {
      date: dateString.slice(0, dateString.indexOf("T")).split("-").reverse().join("-"),
      type: testType,
      sugar: mgDL ? sugarValue : sugarValue*18,
      user_id: userID
    };

    const result = await axios.post('/api/bloodSugar', sugarObj)
    const data = result.data
    if (data.status == "OK") {
      alert("Pressure Recorded");
      window.location.reload()
    } else {
      alert("Please fill the form again");
    }
  };

  return (
    <>
      <div className="bg-indigo-700 text-white font-semibold p-3">
        <div className="flex">
          <Link href="/Dashboard">
            <button className="mx-5 text-xl hover:text-indigo-700 hover:bg-white rounded-full p-1">
              &#60;-
            </button>
          </Link>
          <div>
            <p className="p-1">Blood Sugar</p>
          </div>
        </div>
        <div className="text-center m-3 rounded-xl bg-indigo-500">
          <TodaysDate />
        </div>
      </div>
      <div className="md:flex md:flex-row flex-col">
        <div className="m-5 md:w-1/2">
          <div className="flex flex-col justify-center rounded-md bg-indigo-700 p-5 text-white">
            <h1 className="text-xl text-center">Last Record</h1>
            <div className="last-record flex justify-between my-5 font-bold">
              <div className="text-center">
                <p className="text-gray-100">Fasting</p>
                <p className="text-xl">{ mgDL ? sugarValue * 0.05 : sugarValue}</p>
                <p>{mgDL ? `(mmol/L)` : `(mg/dL)`}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-100">Postprandial (PP)</p>
                <p className="text-xl">{ mgDL ? sugarValue * 0.05 : sugarValue}</p>
                <p>{mgDL ? `(mmol/L)` : `(mg/dL)`}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-100">Random</p>
                <p className="text-xl">{ mgDL ? sugarValue * 0.05 : sugarValue}</p>
                <p>{mgDL ? `(mmol/L)` : `(mg/dL)`}</p>
              </div>
            </div>
            <button className="p-2 bg-orange-500 text-white font-semibold hover:bg-white hover:text-orange-600 border-2 border-orange-600">
              VIEW HISTORY
            </button>
          </div>
          <div>
            <h1 className="text-xl text-center m-5">ADD NEW RECORD</h1>
            <div className="my-5">
              <button
                type="button"
                className={`ml-2 px-3 py-2 ${
                  !mgDL ? "bg-gray-300 text-black" : "bg-blue-600 text-white"
                } hover:bg-gray-400 font-semibold rounded focus:outline-none focus:shadow-outline`}
                onClick={togglemgDL}
              >
                mg/dL
              </button>
              <button
                type="button"
                className={`ml-2 px-3 py-2 ${
                  mgDL ? "bg-gray-300 text-black" : "bg-blue-600 text-white"
                } hover:bg-gray-400 text-gray-800 font-semibold rounded focus:outline-none focus:shadow-outline`}
                onClick={togglemgDL}
              >
                mmol/l
              </button>
            </div>
            {/* Options */}
            <div className="flex justify-center m-10">
              <label htmlFor="dropdown" className="font-semibold m-3">
                Select type <br /> &#40;Fasting/PPBS/Random &#41;:
              </label>
              <select
                id="dropdown"
                value={testType}
                onChange={handleSelectChange}
                className="font-semibold outline-none"
              >
                <option value="">Select</option>
                <option value="fasting">
                  Fasting {mgDL ? `(mmol/L)` : `(mg/dL)`}
                </option>
                <option value="postprandial">
                  Postprandial {mgDL ? `(mmol/L)` : `(mg/dL)`}
                </option>
                <option value="random">
                  Random {mgDL ? `(mmol/L)` : `(mg/dL)`}
                </option>
              </select>
              {testType && (
                <div className="w-1/3 text-center">
                  <input
                    className="text-2xl px-2 outline-none border-b-2 border-black w-20 h-10"
                    type="number"
                    onChange={(e) => setSugarValue(e.target.value)}
                    defaultValue={sugarValue}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <button
                className="bg-orange-600 text-white p-2 hover:bg-white hover:text-orange-600 border-2 border-orange-600"
                onClick={handleSubmit}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
        <div className="md:m-5 md:w-1/2">
          <h1 className="mx-10 text-center text-lg">My Chart</h1>
          <SugarChart data={FSS} />
          <SugarChart data={PPS} />
          <SugarChart data={RS} />
        </div>
      </div>
    </>
  );
}
