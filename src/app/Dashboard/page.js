import Image from 'next/image'

export default function Dashboard() {
  return (
    <>
      <div className="md:text-3xl text-lg bg-indigo-700 m-5 flex justify-between p-5 text-white">
        <h1>Hello <br /> name</h1>
        <h1 className="bg-white text-indigo-700 rounded-lg p-2">Your Medical Records</h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* First row */}
          <div className="bg-gray-200 p-4">
            <Image src='/bloodPressure2.svg' width={500} height={500} alt="blood pressure"/>
            <h2>Blood Pressure</h2>
          </div>
          <div className="bg-gray-300 p-4">
            <Image src='/bloodSugar.svg' width={500} height={500} alt="blood pressure"/>
            <h2>Blood Sugar</h2>
          </div>
          <div className="bg-gray-400 p-4">
            <Image src='/diagnostic.svg' width={500} height={500} alt="blood pressure"/>
            <h2>Diagnostic Reports</h2>
          </div>
          {/* Second row */}
          <div className="bg-gray-500 p-4">
            <Image src='/pill.svg' width={500} height={500} alt="blood pressure"/>
            <h2>Pill Tracker</h2>
          </div>
          <div className="bg-gray-600 p-4">
            <Image src='/doctor.svg' width={500} height={500} alt="blood pressure"/>
            <h2>Doctors / Physicians</h2>
          </div>
          <div className="bg-gray-700 p-4">Item 6</div>
        </div>
      </div>
    </>
  );
}
