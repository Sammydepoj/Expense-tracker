import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [titleInputIsTouched, setTitleInputIsTouched] = useState(false);

  const [enteredAmount, setEnteredAmount] = useState("");
  const [amountInputIsTouched, setAmountInputIsTouched] = useState(false);

  const [enteredDate, setEnteredDate] = useState("");
  const [dateInputIsTouched, setDateInputIsTouched] = useState(false);

  const enteredTitleIsValid = enteredTitle.trim() !== "";
  const titleIsValid = !enteredTitleIsValid && titleInputIsTouched;

  const enteredAmountIsValid = enteredAmount.trim() !== "";
  const amountIsValid = !enteredAmountIsValid && amountInputIsTouched;

  const enteredDateIsValid = enteredDate.trim() !== "";
  const dateIsValid = !enteredDateIsValid && dateInputIsTouched;

  let formIsValid = false;

  if (enteredTitle && enteredAmount && enteredDate) {
    formIsValid = true;
  }

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const titleBlurHandler = () => {
    setTitleInputIsTouched(true);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const amountBlurHandler = () => {
    setAmountInputIsTouched(true);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const dateBlurHandler = () => {
    setDateInputIsTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setTitleInputIsTouched(true);
    setAmountInputIsTouched(true);
    setDateInputIsTouched(true);

    if (!enteredTitle && !enteredAmount && !enteredDate) {
      return;
    }
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    props.onsaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
            onBlur={amountBlurHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
      <p>{props.httpError}</p>
    </form>
  );
};
export default ExpenseForm;
