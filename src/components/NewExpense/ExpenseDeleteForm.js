import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseDeleteForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [titleInputIsTouched, setTitleInputIsTouched] = useState(false);

  const [enteredAmount, setEnteredAmount] = useState("");
  const [amountInputIsTouched, setAmountInputIsTouched] = useState(false);

  const enteredTitleIsValid = enteredTitle.trim() !== "";
  const titleIsValid = !enteredTitleIsValid && titleInputIsTouched;

  const enteredAmountIsValid = enteredAmount.trim() !== "";
  const amountIsValid = !enteredAmountIsValid && amountInputIsTouched;


  let formIsValid = false;

  if (enteredTitle && enteredAmount) {
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

  const submitHandler = (event) => {
    event.preventDefault();
    setTitleInputIsTouched(true);
    setAmountInputIsTouched(true);

    if (!enteredTitle && !enteredAmount) {
      return;
    }
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
    };

    props.onDeleteExpenseData(expenseData);

    setEnteredTitle("");
    setTitleInputIsTouched(false);

    setEnteredAmount("");
    setAmountInputIsTouched(false);

  };

  const amountInputClasses = amountIsValid
    ? "new-expense__control invalid"
    : "new-expense__control";
  const titleInputClasses = titleIsValid
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
          <label>ID</label>
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
              Please type or select the ID for the item purchased !
            </p>
          )}
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit" disabled={!formIsValid}>
          Delete Expense
        </button>
      </div>
      <p className="error-text">{props.httpError}</p>
    </form>
  );
};
export default ExpenseDeleteForm;
