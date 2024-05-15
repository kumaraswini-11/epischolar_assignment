# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- ## [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

### Future Earnings Estimate :::

**Assumptions:**

Let me explain. One guy wants to pursue a course. He can do it in his own country or abroad. Regardless of where he chooses to study, he can opt for a loan if needed; that's entirely his choice. Now, I want to show him his Future Earnings Estimation if he studies in his own country versus studying abroad.

Here are a few assumptions:

1. You will not have any income during your course.
2. You will have to forgo your current salary.
3. You will be responsible for covering a portion of your study abroad expenses, as mentioned by you. However, this portion becomes zero if you are funding your entire expenses through an education loan.
4. `You will receive an increment every year and a promotion every alternate year.`
5. `You will be employed within 6 months after graduation.`
6. `You will pay off your loan within 5 years after graduation.`
7. `For studying abroad, we are currently considering support for the USA, Canada, Germany, and Australia. We are assuming a 2.5% rise in salary every year and a 10% increase every alternate year for these countries. In India, the assumptions are a 7% increase per year and a 20% increase every alternate year.`
8. We believe you will definitely earn more than your current salary, and we are considering that you will get a job in the same country where you are currently employed. In the worst-case scenario, you will certainly earn at least as much as you are currently earning."

**Schemas**

```js
// user schema

// country schema (Static data stored in database)
{
  "countries": {
    "india": {
      "salaryIncrease": {
        "annual": 0.07,
        "alternate": 0.20
      }
    },
    "usa": {
      "salaryIncrease": {
        "annual": 0.025,
        "alternate": 0.10
      }
    },
    "canada": {
      "salaryIncrease": {
        "annual": 0.025,
        "alternate": 0.10
      }
    },
    "germany": {
      "salaryIncrease": {
        "annual": 0.025,
        "alternate": 0.10
      }
    },
    "australia": {
      "salaryIncrease": {
        "annual": 0.025,
        "alternate": 0.10
      }
    }
  }
}

// Applicants details (Input form applicant)
{
  "applicant_details": {
    "currentCountry": "India",
    "currentSalary": 0,
    "courseDuration": 0,
    "isOptedForLoan": true,
    "loanDetails": {
      "percentage": 0,
      "interest": 0,
      "duration": 0
    }
  }
}

```

**Input Provided**

```js
  "applicant_details": [
  {
    "currentCountry": "India",
    "currentSalary": 5000, // Salary in own country currency
    "courseDuration": 2, // Duration of the course in years
    "desiredCountry": "India", // Desired country for education
    "isOptedForLoan": true, // Whether opted for a loan
    "loanDetails": {
      "percentage": 80, // Percentage of the course cost covered by the loan
      "interest": 5, // Annual interest rate for the loan
      "duration": 7 // Total duration of the loan (courseDuration + 5)
    }
  },

  {
    "currentCountry": "India",
    "currentSalary": 7000, // Salary in own country currency
    "courseDuration": 4, // Duration of the course in years
    "desiredCountry": "USA", // Desired country for education
    "isOptedForLoan": false, // Whether opted for a loan
    "loanDetails": {
      "percentage": 0, // Percentage of the course cost covered by the loan
      "interest": 0, // Annual interest rate for the loan
      "duration": 0 // Total duration of the loan (courseDuration + 5)
    }
  },

  {
    "currentCountry": "India",
    "currentSalary": 5000, // Salary in own country currency
    "courseDuration": 2, // Duration of the course in years
    "desiredCountry": "USA", // Desired country for education
    "isOptedForLoan": true, // Whether opted for a loan
    "loanDetails": {
      "percentage": 80, // Percentage of the course cost covered by the loan
      "interest": 5, // Annual interest rate for the loan
      "duration": 7 // Total duration of the loan (courseDuration + 5)
    }
  }
]

```

**Output**

If the person joining abroat then,

- What's the income & saving in your country Vs aboart, in courseDuration + 5 (as we assumed above)

`totalEarnings = (currentSalary × (courseDuration + bufferMonths)) + (max(currentSalary, 30000) × (1 + salaryIncreaseRate)^(loanDuration) × (loanPercentage / 100) × (1 + loanInterestRate / 100))`

This formula provided can work for any country and accommodates both scenarios: whether the applicant opts for a loan or not.

- currentSalary: is the current salary of the applicant, witch is considered zero, for the time period witch he is doing the cource
- courseDuration: is the duration of the course in years.
- bufferMonths: is the buffer period in months witch might take a person to get job.(6 months in this case). The buffer period should not be included in the loan duration because the loan repayment typically starts after completing the course, not during the buffer period.
- salaryAfterCourse: is the expected salary after completing the course. (in this case assuming, a default salary of 30,000 if the initial salary is not greater than this value.)
- salaryIncreaseRate: is the annual salary increase rate based on the country where the course is completed.
- loanDuration: The total duration of the loan, which starts from the time the applicant takes the loan until it is paid off. The repayment typically starts after the applicant gets a job, and the loan duration is calculated based on when the loan is paid off, considering the applicant's salary after completing the course, salary increase rate, and any buffer period. In this scenario, we assume that the applicant will pay off the loan within the next 5 years after completing the course.

`totalLoanAmount = salaryAfterCourse * (1 + salaryIncreaseRate)^(loanDuration) * (loanPercentage / 100) * (1 + loanInterestRate / 100)`

- salaryAfterCourse: The expected salary after completing the course.
- salaryIncreaseRate: The annual salary increase rate based on the country where the course is completed.
- loanDuration: The total duration of the loan, calculated based on when the loan is paid off, considering the applicant's salary after completing the course, salary increase rate, and any buffer period.
- loanPercentage: The percentage of the course cost covered by the loan.
- loanInterestRate: The annual interest rate for the loan.

`totalSavings = totalEarnings - totalLoanAmount`

- totalEarnings: Total earnings during and after completing the course, considering salary, salary increase rate, loan percentage, loan interest rate, and loan duration.
- totalLoanAmount: Total loan amount taken by the applicant to cover the course expenses, considering loan percentage, loan interest rate, and loan duration.
