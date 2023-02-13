import React from "react";
import ExpenseDeleteForm from "./ExpenseDeleteForm";

import "./NewExpense.css";

const DeleteExpense = (props) => {
  const deleteExpenseDataHandler = () => {
    const expenseData = {
    //   ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onDeleteExpense(expenseData);
  };

  return (
    <div className="new-expense">
      <ExpenseDeleteForm
        onDeleteExpenseData={deleteExpenseDataHandler}
        httpError={props.error}
      />
    </div>
  );
};
export default DeleteExpense;
