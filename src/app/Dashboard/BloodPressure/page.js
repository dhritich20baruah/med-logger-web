"use client";
import React, {useState, useEffect} from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import TodaysDate from "@/app/component/TodaysDate";
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
  const [systolic, setSystolic] = useState(0)
  const [diastolic, setDiastolic] = useState(0)
  const [pulse, setPulse] = useState(0)
  const searchParams = useSearchParams()
  const userInfo = searchParams.getAll('userInfo')
  // Parse userInfo if it exists
  let userObj = null;
  if (userInfo) {
    try {
      userObj = JSON.parse(userInfo);
    } catch (error) {
      console.error('Error parsing userInfo:', error);
    }
  }

  
  const handleSystolicChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 300) {
      setSystolic(value);
    }
  };

  const handleDiastolicChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 200) {
      setDiastolic(value);
    }
  };

  const submitPressure = async (e) => {
    e.preventDefault()
    let dateString = new Date().toISOString()
    const pressureObj = {
      date: dateString.slice(0, dateString.indexOf("T")).split("-").reverse().join("-"),
      systolic,
      diastolic,
      pulse,
      user_id: userObj.id
    }
    console.log(pressureObj)
    const result = await axios.post('/api/bloodPressure', pressureObj)
    const data = result.data
    if (data.status == "OK") {
      alert("Pressure Recorded");
      window.location.reload()
    } else {
      alert("Please fill the form again");
    }
  }
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
        <div className="text-center m-3 rounded-xl bg-indigo-500">
          <TodaysDate/>
        </div>
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
          <form>
            <h1 className="text-xl text-center m-5">ADD NEW RECORD</h1>
            <div className="new-record my-5 mx-10 flex justify-between space-x-5">
              <div className="w-1/3 text-center">
                <label className="text-gray-900">Systolic (mmHg)</label> <br />
                <input
                  className="text-xl p-3 outline-none shadow-lg shadow-black w-20 h-20"
                  type="number" defaultValue={systolic} min="0" max="300"  onInput={handleSystolicChange} required
                />
              </div>
              <div className="w-1/3 text-center">
                <label className="text-gray-900">Diastolic (mmHg)</label> <br />
                <input
                  className="text-xl p-3 outline-none shadow-lg shadow-black w-20 h-20"
                  type="number" defaultValue={diastolic} min="0" max="200" onInput={handleDiastolicChange} required
                />
              </div>
              <div className="w-1/3 text-center">
                <label className="text-gray-900">Pulse (BPM)</label> <br />
                <input
                  className="text-xl p-3 outline-none shadow-lg shadow-black w-20 h-20"
                  type="number" defaultValue={pulse} min="0" max="300" onChange={(e)=>setPulse(e.target.value)} required
                />
              </div>
            </div>
            <div className="flex justify-center">
                <button className="bg-orange-600 text-white p-2 hover:bg-white hover:text-orange-600 border-2 border-orange-600" onClick={submitPressure}>ADD</button>
            </div>
          </form>
        </div>
        <div className="md:m-5 md:w-1/2">
          <h1 className="mx-10 text-center text-lg">My Chart</h1>
          <LineChart data={data} />
        </div>
      </div>
    </>
  );
}
