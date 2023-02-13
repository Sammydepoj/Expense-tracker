import React from "react";

import ExpenseForm from "./ExpenseFom";
import "./NewExpense.css";

const NewExpense = (props) => {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseForm
        onsaveExpenseData={saveExpenseDataHandler}
        httpError={props.error}
      />
    </div>
  );
};
export default NewExpense;
