"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userID = await localStorage.getItem("userID");
      const userObj = {
        userID: userID,
      };
      const { data } = await axios.post("/api/fetchOne", userObj); // Destructure data directly
      const result = data;
      setUserInfo(result.userInfo); // Update userInfo with result.userInfo
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <>
      <div className="md:text-xl text-lg bg-indigo-700 m-5 flex justify-evenly p-5 text-white">
        <div className="w-1/2">
          <h1 className="p-2">Hello {userInfo.name}</h1>
        </div>
        <div className="w-1/2">
          <h1 className="bg-white text-indigo-700 rounded-lg p-2">
            Your Medical Records
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* First row */}
          <div className="bg-white p-4 flex flex-col items-center justify-center relative space-y-2 shadow-lg shadow-black">
            <Image
              src="/bloodPressure.svg"
              width={500}
              height={500}
              alt="blood pressure"
              className="w-20 h-20"
            />
            <h2 className="text-center font-semibold ">Blood Pressure</h2>
            <Link
              href={{
                pathname: "/Dashboard/BloodPressure",
                query: { userInfo: JSON.stringify(userInfo) },
              }}
            >
              <button className="p-2 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 border-2 border-red-600">
                Record
              </button>
            </Link>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center relative space-y-2 shadow-lg shadow-black">
            <Image
              src="/bloodSugar.svg"
              width={500}
              height={500}
              alt="blood pressure"
              className="w-20 h-20"
            />
            <h2 className="text-center font-semibold ">Blood Sugar</h2>
            <Link href="/Dashboard/BloodSugar">
              <button className="p-2 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 border-2 border-red-600">
                Record
              </button>
            </Link>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center relative space-y-2 shadow-lg shadow-black">
            <Image
              src="/diagnostic.svg"
              width={500}
              height={500}
              alt="blood pressure"
              className="w-20 h-20"
            />
            <h2 className="text-center font-semibold ">Diagnostic Reports</h2>
            <Link href="/Dashboard/DiagnosticReports">
              <button className="p-2 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 border-2 border-red-600">
                Record
              </button>
            </Link>
          </div>
          {/* Second row */}
          <div className="bg-white p-4 flex flex-col items-center justify-center relative space-y-2 shadow-lg shadow-black">
            <Image
              src="/pill.svg"
              width={500}
              height={500}
              alt="blood pressure"
              className="w-20 h-20"
            />
            <h2 className="text-center font-semibold ">Pill Tracker</h2>
            <Link href={{
                pathname: "/Dashboard/PillTracker",
                query: { userInfo: JSON.stringify(userInfo) },
              }}>
              <button className="p-2 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 border-2 border-red-600">
                Record
              </button>
            </Link>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center relative space-y-2 shadow-lg shadow-black">
            <Image
              src="/doctor.svg"
              width={500}
              height={500}
              alt="blood pressure"
              className="w-20 h-20"
            />
            <h2 className="text-center font-semibold ">Your Doctors</h2>
            <Link href="#">
              <button className="p-2 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 border-2 border-red-600">
                Record
              </button>
            </Link>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center relative space-y-2 shadow-lg shadow-black">
            <Image
              src="/lock.svg"
              width={500}
              height={500}
              alt="blood pressure"
              className="w-20 h-20"
            />
            <h2 className="text-center font-semibold ">Log Out</h2>
            <Link href="#">
              <button className="p-2 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 border-2 border-red-600">
                Record
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
