import React,{useState} from 'react';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter'
import ExpenseList from './ExpenseList';
import './Expenses.css';

function Expenses(props) {
  const [filteredYear, setFilteredYear] =useState('2020');

  const filterChangeHandler = selectedYear =>{
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter(expense => {
    return expense.date.getFullYear().toString() === filteredYear;
  });



  return (
    <Card className="expenses">
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler}
      />
      <ExpenseList items={filteredExpenses} />
    </Card>
  );
}
export default Expenses;