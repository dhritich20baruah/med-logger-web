"use client";
import React, { useState } from "react";
import Link from "next/link";
import TodaysDate from "@/app/component/TodaysDate";

const Reports = () => {
  const [file, setFile] = useState()

  async function handleUpload(e) {
    e.preventDefault()
    if(!file) return
    try {
        const data = new FormData()
        data.append('file', file)

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: data
        })

        if (!res.ok) throw new Error(await res.text())
    } catch (error) {
        console.error(error)
    }

  }

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
            <p className="p-1">Diagnostic Reports</p>
          </div>
        </div>
        <div className="text-center m-3 rounded-xl bg-indigo-500">
          <TodaysDate/>
        </div>
      </div>
      <div className="flex justify-center m-10">
        <form className="rounded-full px-5 py-1 border-2 border-black">
            <input type="file" name="file" id="file" onChange={(e)=>setFile(e.target.files?.[0])}/>
            <button type="submit" onClick={handleUpload} className="bg-orange-600 text-white p-1 hover:bg-green-700">Upload</button>
        </form>
      </div>
    </>
  );
};

export default Reports;
