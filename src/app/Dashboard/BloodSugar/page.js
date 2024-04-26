"use client";
import SugarChart from "./Chart";
import Link from "next/link";
import TodaysDate from "@/app/component/TodaysDate";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

import { useState, useEffect } from "react";

export default function BloodSugar() {
  const [fasting, setFasting] = useState([{"date": "", "type": "", "sugar": ""}]);
  const [postprandial, setPostprandial] = useState([{"date": "", "type": "", "sugar": ""}]);
  const [random, setRandom] = useState([{"date": "", "type": "", "sugar": ""}]);
  const [mgDL, setmgDL] = useState(true);

  const [testType, setTestType] = useState("");
  const [sugarValue, setSugarValue] = useState(0);

   //HISTORICAL DATA
   const [prevReadings, setPrevReadings] = useState([{
    "date": "",
    "type": "",
    "sugar": "",
  }])

  useEffect(() => {
    fetchSugar();
  }, []);

  const fetchSugar = async () => {
    try {
      const userID = await localStorage.getItem("userID");
      const data = await axios.get(`/api/bloodSugar/${userID}`); // Destructure data directly
      const result = data.data.readings;
      setPrevReadings(result)
      const fastingSugar = result.filter(item => item.type == "fasting")
      setFasting(fastingSugar)
      const ppSugar = result.filter(item => item.type == "postprandial")
      setPostprandial(ppSugar)
      const RandomSugar = result.filter(item => item.type == "random")
      setRandom(RandomSugar)
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSelectChange = (event) => {
    setTestType(event.target.value);
  };

  const togglemgDL = () => {
    setmgDL((mgDL) => !mgDL);
  };

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

  //CHART
  let fbsDateArr = fasting.map((item)=> item.date)
  let fbsArr = fasting.map((item)=> item.sugar)

  let pbsDateArr = postprandial.map((item)=> item.date)
  let pbsArr = postprandial.map((item)=> item.sugar)

  let rbsDateArr = random.map((item)=> item.date)
  let rbsArr = random.map((item)=> item.sugar)

  const FSS = {
    labels: fbsDateArr.slice(fbsDateArr.length-7, fbsDateArr.length),
    datasets: [
      {
        label: "Fasting",
        data: fbsArr.slice(fbsArr.length-7, fbsArr.length),
        fill: true,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };
  
  const PPS = {
    labels: pbsDateArr.slice(pbsDateArr.length-7, pbsDateArr.length),
    datasets: [
      {
        label: "Postprandial",
        data: pbsArr.slice(pbsArr.length-7, pbsArr.length),
        fill: true,
        borderColor: "orange",
        tension: 0.1,
      },
    ],
  };
  
  const RS = {
    labels: rbsDateArr.slice(rbsDateArr.length-7, rbsDateArr.length),
    datasets: [
      {
        label: "Random",
        data: rbsArr.slice(rbsArr.length-7, rbsArr.length),
        fill: true,
        borderColor: "rgb(255,0,255)",
        tension: 0.1,
      },
    ],
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
                <p className="text-xl">{ mgDL ? fasting[fasting.length-1].sugar : fasting[fasting.length-1].sugar *0.05}</p>
                <p>{mgDL ? `(mmol/L)` : `(mg/dL)`}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-100">Postprandial (PP)</p>
                <p className="text-xl">{ mgDL ? postprandial[postprandial.length-1].sugar : postprandial[postprandial.length-1].sugar *0.05}</p>
                <p>{mgDL ? `(mmol/L)` : `(mg/dL)`}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-100">Random</p>
                <p className="text-xl">{ mgDL ? random[random.length-1].sugar : random[random.length-1].sugar *0.05}</p>
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
