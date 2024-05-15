import { countriesData } from "../data/countriesData";

const calculateResults = ({
  currentSalary,
  courseDuration,
  desiredCountry,
  loanDetails,
}) => {
  const { interest: loanInterestRate, percentage: loanPercentage } =
    loanDetails;
  const bufferMonths = 6;
  const loanDuration = parseInt(courseDuration) + 5;

  const results = countriesData.map((countryData) => {
    const { country, salaryIncrease } = countryData;
    const { annual: salaryIncreaseRate } = salaryIncrease;

    const earningsFromSalary = currentSalary * (courseDuration + bufferMonths);
    const salaryAfterCourse = Math.max(currentSalary, 30000);
    const earningsFromSalaryAfterCourse =
      salaryAfterCourse * (1 + salaryIncreaseRate) ** loanDuration;
    const totalEarnings = earningsFromSalary + earningsFromSalaryAfterCourse;

    const totalLoanAmount =
      salaryAfterCourse *
      (1 + salaryIncreaseRate) ** loanDuration *
      (loanPercentage / 100) *
      (1 + loanInterestRate / 100);

    const totalSavings = totalEarnings - totalLoanAmount;

    return {
      country,
      totalEarnings,
      totalLoanAmount,
      totalSavings,
    };
  });

  return results;
};

export { calculateResults };
