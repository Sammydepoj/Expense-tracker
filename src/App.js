import React, { useState, useEffect } from "react";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  // const [expensesData, setExpensesData] = useState([]);
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(
        "https://react-http-dff7f-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      // console.log(responseData);
      const loadedExpenses = [];
      
      for (const key in responseData) {
        // function formatDate(formattedDate) {
        //   formattedDate = new Date();
        // }
        loadedExpenses.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount,
          date: responseData[key].date,
        });

      }
      // setExpensesData(loadedExpenses)
      console.log(loadedExpenses);
    };
    fetchExpenses();
  }, []);
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
