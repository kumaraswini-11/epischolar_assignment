import React, { useState } from "react";
import { countriesData } from "../data/countriesData";
import { calculateResults } from "../utils/calculateResults";
import Results from "./Results";
import Chart from "./Chart";

const Calculator = () => {
  const [formData, setFormData] = useState({
    currentCountry: countriesData[0].country,
    desiredCountry: countriesData[1].country,
    currentSalary: 0,
    courseDuration: 1,
    isOptedForLoan: false,
    loanDetails: {
      percentage: "",
      interest: "",
      duration: "",
    },
  });
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedResults = calculateResults(formData);
    setResults(calculatedResults);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "isOptedForLoan" || name.startsWith("loanDetails")) {
      setFormData({
        ...formData,
        [name]: name === "isOptedForLoan" ? checked : value,
        loanDetails: name.startsWith("loanDetails")
          ? { ...formData.loanDetails, [name.split(".")[1]]: value }
          : formData.loanDetails,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="currentCountry" className="block mb-2">
            Current Country
          </label>
          <select
            id="currentCountry"
            name="currentCountry"
            value={formData.currentCountry}
            onChange={handleChange}
            className="block w-full border rounded p-2"
          >
            {countriesData.map((country) => (
              <option key={country.country}>{country.country}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="desiredCountry" className="block mb-2">
            Desired Country
          </label>
          <select
            id="desiredCountry"
            name="desiredCountry"
            value={formData.desiredCountry}
            onChange={handleChange}
            className="block w-full border rounded p-2"
          >
            {countriesData.map((country) => (
              <option key={country.country}>{country.country}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="currentSalary" className="block mb-2">
            Current Salary
          </label>
          <input
            type="number"
            id="currentSalary"
            name="currentSalary"
            value={formData.currentSalary}
            onChange={handleChange}
            className="block w-full border rounded p-2"
            required // Ensure it's a required field
          />
        </div>
        <div className="mb-4">
          <label htmlFor="courseDuration" className="block mb-2">
            Course Duration (Years)
          </label>
          <select
            id="courseDuration"
            name="courseDuration"
            value={formData.courseDuration}
            onChange={handleChange}
            className="block w-full border rounded p-2"
          >
            {[...Array(9).keys()].map((duration) => (
              <option key={duration}>{duration + 1}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            id="isOptedForLoan"
            name="isOptedForLoan"
            checked={formData.isOptedForLoan}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isOptedForLoan">
            Do you want to apply for a loan?
          </label>
        </div>

        {/* Loan Details */}
        {formData.isOptedForLoan && (
          <div className="flex items-center mb-4">
            <div className="mr-8">
              <label htmlFor="loanPercentage" className="inline mb-2">
                Loan Percentage
              </label>
              <input
                type="number"
                id="loanPercentage"
                name="loanDetails.percentage"
                value={formData.loanDetails.percentage}
                onChange={handleChange}
                className="block w-auto border rounded p-2"
              />
            </div>
            <div>
              <label htmlFor="loanInterest" className="inline mb-2">
                Loan Interest Rate (%)
              </label>
              <input
                type="number"
                id="loanInterest"
                name="loanDetails.interest"
                value={formData.loanDetails.interest}
                onChange={handleChange}
                className="block w-auto border rounded p-2"
              />
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Calculate
        </button>
      </form>

      {/* Display results */}
      {results && (
        <>
          <Results results={results} />
          <Chart data={results} />
        </>
      )}
    </div>
  );
};

export default Calculator;
