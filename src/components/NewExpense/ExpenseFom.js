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
    setTitleInputIsTouched(false);

    setEnteredAmount("");
    setAmountInputIsTouched(false);

    setEnteredDate("");
    setDateInputIsTouched(false);
  };

  const amountInputClasses = amountIsValid
    ? "new-expense__control invalid"
    : "new-expense__control";
  const titleInputClasses = titleIsValid
    ? "new-expense__control invalid"
    : "new-expense__control";

  const dateInputClasses = dateIsValid
    ? "new-expense__control invalid"
    : "new-expense__control";

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className={titleInputClasses}>
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {titleIsValid && <p className="error-text">Please input a title !</p>}
        </div>
        <div className={amountInputClasses}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
            onBlur={amountBlurHandler}
          />
          {amountIsValid && (
            <p className="error-text">
              Please type or select the amount for the item purchased !
            </p>
          )}
        </div>
        <div className={dateInputClasses}>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
          {dateIsValid && <p className="error-text">Please pick a date !</p>}
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit" disabled={!formIsValid}>
          Add Expense
        </button>
      </div>
      <p className="error-text">{props.httpError}</p>
    </form>
  );
};
export default ExpenseForm;
