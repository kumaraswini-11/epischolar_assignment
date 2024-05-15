const Results = ({ results }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Results:</h2>
      {/* Display results */}
      {results.map((result, index) => (
        <p key={index} className="mb-2">
          {Object.entries(result).map(([key, value]) => (
            <span key={key}>
              {key.replace(/([A-Z])/g, " $1").trim()}: {value}
              <br />
            </span>
          ))}
        </p>
      ))}
    </div>
  );
};

export default Results;
