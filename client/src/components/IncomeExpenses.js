import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
 

const IncomeExpenses = () => {

  const { transactions, convertCurrency } = useContext(GlobalContext)
  const amounts = transactions.map(transaction => transaction.amount)
  
  const income = amounts
  .filter(item => item > 0)
  .reduce((acc, item) => (acc += item), 0)
  .toFixed(2);

  const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);

    return (
        <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" className="money plus">+{convertCurrency(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">-{convertCurrency(expense)}</p>
        </div>
      </div>
    )
}

export default IncomeExpenses
