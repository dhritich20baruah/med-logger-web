"use client";
import TodaysDate from "@/app/component/TodaysDate";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function PillTracker() {
  const [date, setDate] = useState(new Date());

  const searchParams = useSearchParams();
  const userInfo = searchParams.getAll("userInfo");
  // Parse userInfo if it exists
  let userObj = null;
  if (userInfo) {
    try {
      userObj = JSON.parse(userInfo);
    } catch (error) {
      console.error("Error parsing userInfo:", error);
    }
  }

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <main>
      <div className="bg-indigo-700 text-white font-semibold p-3">
        <div className="flex">
          <Link href="/Dashboard">
            <button className="mx-5 text-xl hover:text-indigo-700 hover:bg-white rounded-full p-1">
              &#60;-
            </button>
          </Link>
          <div>
            <p className="p-1">Pill Tracker</p>
          </div>
        </div>
        <div className="text-center m-3 rounded-xl bg-indigo-500">
          <TodaysDate />
        </div>
      </div>
      <div className="m-10 md:flex md:flex-row flex-col">
        <div className="md:w-[30%]">
        <Calendar
          onChange={onChange}
          value={date}
          className="bg-white shadow-lg shadow-black rounded-lg p-4"
          calendarType="US"
          locale="en-US"
          tileClassName={({ date, view }) => {
              // Add custom classes to calendar tiles based on date or view
              return "text-sm p-2";
            }}
            />
        </div>
        <div className="md:w-[70%]">
            <div>
                <input type="text" name="addMed" id="addMed" className="shadow-lg shadow-black p-3 mx-3 rounded-lg md:w-[70%]"/>
                <button className="p-3 bg-orange-500 text-white rounded-lg shadow-lg shadow-black">ADD MEDICATION</button>
            </div>
            <div className="mx-5 my-10">
                <h1 className="text-lg font-semibold">What is the form of the medication?</h1>
                <div className="medicationForm space-x-3 font-semibold">
                    <input type="radio" name="medicineForm" id="pill" className="radio" value="pill"/>
                    <label htmlFor="pill">Pill</label>
                    <input type="radio" name="medicineForm" id="liquid" className="radio" value="liquid"/>
                    <label htmlFor="liquid">Liquid</label>
                    <input type="radio" name="medicineForm" id="injection" className="radio" value="injection"/>
                    <label htmlFor="injection">Injection</label>
                    <input type="radio" name="medicineForm" id="drops" className="radio" value="drops"/>
                    <label htmlFor="drops">Drops</label>
                    <input type="radio" name="medicineForm" id="inhaler" className="radio" value="inhaler"/>
                    <label htmlFor="inhaler">Inhaler</label>
                </div>
            </div>
            <div className="mx-5 my-10">
                <h1 className="text-lg font-semibold">Set doses and duration</h1>
                <div>
                    <label htmlFor="doses">Set how many times you need to take it.</label>
                    <input type="number" name="doses" id="doses" className="shadow-lg shadow-black p-3 mx-3 rounded-lg"/>
                    <p className="text-md font-semibold">When you need to take the medicine</p>
                    <label htmlFor="doses">Dose 1</label>
                    <input type="number" name="doses" id="doses" className="shadow-lg shadow-black p-3 mx-3 rounded-lg"/>
                </div>
            </div>
            <div className="mx-5 my-10">
                <h1 className="text-lg font-semibold">How long do you need to take it?</h1>

            </div>
        </div>
      </div>
    </main>
  );
}
