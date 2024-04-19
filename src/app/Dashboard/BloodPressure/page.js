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

export default function BloodPressure() {
  const [systolic, setSystolic] = useState(120)
  const [diastolic, setDiastolic] = useState(70)
  const [pulse, setPulse] = useState(60)
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

  //HISTORICAL DATA
  const [prevReadings, setPrevReadings] = useState([{
    "date": "",
    "systolic": "",
    "diastolic": "",
    "pulse": ""
  }])
  useEffect(() => {
    fetchPressure();
  }, []);

  const fetchPressure = async () => {
    try {
      const userID = await localStorage.getItem("userID");
      const data = await axios.get(`/api/bloodPressure/${userID}`); // Destructure data directly
      const result = data.data.readings;
      setPrevReadings(result)
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  //NEW RECORD
  const submitPressure = async (e) => {
    e.preventDefault()
    let dateString = new Date().toISOString()

    // if (!isNaN(value) && value >= 0 && value <= 200) {
    //   setDiastolic(value);
    // }

    const pressureObj = {
      date: dateString.slice(0, dateString.indexOf("T")).split("-").reverse().join("-"),
      systolic: parseInt(systolic),
      diastolic: parseInt(diastolic),
      pulse: parseInt(pulse),
      user_id: userObj.id
    }
    const result = await axios.post('/api/bloodPressure', pressureObj)
    const data = result.data
    if (data.status == "OK") {
      alert("Pressure Recorded");
      window.location.reload()
    } else {
      alert("Please fill the form again");
    }
  }

  // CHART DATA
  let dateArr = prevReadings.map((item)=> item.date)
  let systolicArr = prevReadings.map((item)=> item.systolic)
  let diastolicArr = prevReadings.map((item)=> item.diastolic)

  const data = {
    labels: dateArr.slice(dateArr.length-7, dateArr.length),
    datasets: [
      {
        label: "Systolic",
        data: systolicArr.slice(systolicArr.length-7, systolicArr.length),
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
      {
        label: "Diastolic",
        data: diastolicArr.slice(diastolicArr.length-7, diastolicArr.length),
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
    ],
  };
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
                <p className="text-xl">{prevReadings[prevReadings.length-1].systolic}</p>
                <p>mmHg</p>
              </div>
              <div className="text-center">
                <p className="text-gray-100">Diastolic</p>
                <p className="text-xl">{prevReadings[prevReadings.length-1].diastolic}</p>
                <p>mmHg</p>
              </div>
              <div className="text-center">
                <p className="text-gray-100">Pulse</p>
                <p className="text-xl">{prevReadings[prevReadings.length-1].pulse}</p>
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
                  type="number" defaultValue={systolic} min="0" max="300"  onChange={(e)=>setSystolic(e.target.value)} required
                />
              </div>
              <div className="w-1/3 text-center">
                <label className="text-gray-900">Diastolic (mmHg)</label> <br />
                <input
                  className="text-xl p-3 outline-none shadow-lg shadow-black w-20 h-20"
                  type="number" defaultValue={diastolic} min="0" max="200" onChange={(e)=>setDiastolic(e.target.value)} required
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
