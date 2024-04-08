import Image from "next/image";
import Link from "next/link";
export default function Dashboard() {
  return (
    <>
      <div className="md:text-xl text-lg bg-indigo-700 m-5 flex justify-evenly p-5 text-white">
        <div className="w-1/2">
          <h1 className="p-2">Hello name</h1>
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
            <Link href="/Dashboard/BloodPressure">
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
            <Link href="#">
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
            <Link href="#">
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
            <Link href="#">
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
            Item 6
          </div>
        </div>
      </div>
    </>
  );
}
