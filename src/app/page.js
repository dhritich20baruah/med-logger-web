"use client";
import { useState } from "react";
export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [heightUnit, setHeightUnit] = useState(false);
  const [weightUnit, setWeightUnit] = useState(false);
  const [feet, setFeet] = useState(0);
  const [inch, setInch] = useState(0);
  const [errors, setErrors] = useState({});

  const toggleWeightUnit = () => {
    setWeightUnit((weightUnit) => !weightUnit);
  };

  const toggleHeightUnit = () => {
    setHeightUnit((heightUnit) => !heightUnit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {};

    // Validation for name
    if (!name.trim()) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    // Validation for age
    if (!age.trim() || isNaN(parseInt(age))) {
      newErrors.age = "Age must be a number";
      formIsValid = false;
    }

    // Validation for weight
    if (!weight.trim() || isNaN(parseFloat(weight))) {
      newErrors.weight = "Weight must be a number";
      formIsValid = false;
    }

    // Validation for height
    if (heightUnit) {
      if (!feet.trim() || isNaN(parseInt(feet))) {
        newErrors.height = "Feet must be a number";
        formIsValid = false;
      }
      if (!inch.trim() || isNaN(parseInt(inch))) {
        newErrors.height = "Inches must be a number";
        formIsValid = false;
      }
    } else {
      if (!height.trim() || isNaN(parseFloat(height))) {
        newErrors.height = "Height must be a number";
        formIsValid = false;
      }
    }

    // If form is not valid, set the errors and return
    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    let heightResult = height;
    let weightResult = weight;
    if (heightUnit) {
      const totalInches = parseInt(feet) * 12 + parseInt(inch);
      const centimeters = totalInches * 2.54;
      heightResult = centimeters;
    }

    if (weightUnit) {
      const weightInKg = parseInt(weight) * 0.45;
      weightResult = weightInKg;
    }

    const userObj = {
      name: name,
      age: age,
      height: heightResult + "cm",
      weight: weightResult + "kg",
    };
    console.log(userObj);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.age ? "border-red-500" : ""
            }`}
            id="age"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && (
            <p className="text-red-500 text-xs italic">{errors.age}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="weight"
          >
            Weight ({weightUnit ? `in lb.` : `in kg.`})
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.weight ? "border-red-500" : ""
            }`}
            id="weight"
            type="number"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          {errors.weight && (
            <p className="text-red-500 text-xs italic">{errors.weight}</p>
          )}
          <div className="my-5">
            <button
              type="button"
              className={`ml-2 px-3 py-2 ${
                weightUnit ? "bg-gray-300" : "bg-blue-600"
              } hover:bg-gray-400 text-gray-800 font-semibold rounded focus:outline-none focus:shadow-outline`}
              onClick={toggleWeightUnit}
            >
              Kg
            </button>
            <button
              type="button"
              className={`ml-2 px-3 py-2 ${
                !weightUnit ? "bg-gray-300" : "bg-blue-600"
              } hover:bg-gray-400 text-gray-800 font-semibold rounded focus:outline-none focus:shadow-outline`}
              onClick={toggleWeightUnit}
            >
              lb.
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="height"
          >
            Height ({heightUnit ? `in ft-in.` : `in cm.`})
          </label>
          {heightUnit ? (
            <div className="flex justify-evenly">
              <input
                className={`shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.height ? "border-red-500" : ""
                }`}
                id="feet"
                type="text"
                placeholder="Feet"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
              />
              {errors.height && (
                <p className="text-red-500 text-xs italic">{errors.height}</p>
              )}
              <input
                className={`shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.height ? "border-red-500" : ""
                }`}
                id="inch"
                type="text"
                placeholder="Inches"
                value={inch}
                onChange={(e) => setInch(e.target.value)}
              />
            </div>
          ) : (
            <>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.height ? "border-red-500" : ""
                }`}
                id="height"
                type="text"
                placeholder="Height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              {errors.height && (
                <p className="text-red-500 text-xs italic">{errors.height}</p>
              )}
            </>
          )}
          <div className="my-5">
            <button
              type="button"
              className={`ml-2 px-3 py-2 ${
                heightUnit ? "bg-gray-300" : "bg-blue-600"
              } hover:bg-gray-400 text-gray-800 font-semibold rounded focus:outline-none focus:shadow-outline`}
              onClick={toggleHeightUnit}
            >
              cm
            </button>
            <button
              type="button"
              className={`ml-2 px-3 py-2 ${
                !heightUnit ? "bg-gray-300" : "bg-blue-600"
              } hover:bg-gray-400 text-gray-800 font-semibold rounded focus:outline-none focus:shadow-outline`}
              onClick={toggleHeightUnit}
            >
              ft-in
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
