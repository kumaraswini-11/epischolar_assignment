import React, { useState } from "react";
import Calculator from "./components/Calculator";

function App() {
  return (
    <section className="max-w-4xl mx-auto my-10 px-3 py-5 shadow-lg rounded-xl">
      <div className="w-full">
        <h1 className="text-2xl text-center font-semibold text-gray-700 text-wrap">
          Estimate Your
          <span className=" text-red-500 ml-2">Future Earnings</span>
        </h1>
        <p className="md:w-5/6 text-center mx-auto">
          The displayed Future Earning based on the various factors. There are
          are few things we keept in assumtion.
        </p>
      </div>

      <Calculator />
    </section>
  );
}

export default App;
