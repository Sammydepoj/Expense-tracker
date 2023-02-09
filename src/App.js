import React, { useState, useEffect } from "react";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

function App() {
  const [expensesData, setExpensesData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, sethttpError] = useState();
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
        });
      }
      setExpensesData(loadedExpenses);
    };
    fetchExpenses().catch((error) => {
      // setIsLoading(false);
      // sethttpError(error.message);
      console.log(error.message);
    });
  }, []);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   );
  // }

  // if (httpError) {
  //   return (
  //     <section>
  //       <p>{httpError}</p>
  //     </section>
  //   );
  // }

  const addExpenseHandler = (expense) => {
    setExpensesData((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expensesData} />
    </div>
  );
}
export default App;
