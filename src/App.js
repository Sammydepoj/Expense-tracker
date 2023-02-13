import React, { useState, useEffect } from "react";

import Expenses from "./components/Expenses/Expenses";
import DeleteExpense from "./components/NewExpense/DeleteExpense";
import NewExpense from "./components/NewExpense/NewExpense";

function App() {
  const [expensesData, setExpensesData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [httpError, sethttpError] = useState("");
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(
        "https://react-http-dff7f-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedExpenses = [];

      for (const key in responseData) {
        loadedExpenses.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount,
          date: new Date(responseData[key].date),
          number: responseData[key].id,
        });
      }
      setExpensesData(loadedExpenses);
      // console.log(expensesData);
    };
    fetchExpenses().catch((error) => {
      // setIsLoading(false);
      sethttpError(error.message);
      console.log(error.message);
    });
  }, []);

  const addExpenseHandler = async (expense) => {
    try {
      const saveData = await fetch(
        "https://react-http-dff7f-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
        }
      );
      console.log(saveData);
      if (!saveData) {
        throw new Error("Something went wrong !");
      }
      if (!saveData.ok) {
        throw new Error("Failed to Save !");
      }
      if (saveData.ok) {
        sethttpError("Expense Successfully Saved !");
        setTimeout(() => {
          sethttpError("");
        }, 3000);
      }
      setExpensesData((prevExpenses) => {
        return [expense, ...prevExpenses];
      });
    } catch (error) {
      console.log(error);
      sethttpError(error.message);
    }
  };

  const deleteExpenseHandler = async (expense) => {};

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} error={httpError} />
      <DeleteExpense
        onDeleteExpenseData={deleteExpenseHandler}
        error={httpError}
      />
      <Expenses items={expensesData} />
    </div>
  );
}
export default App;
