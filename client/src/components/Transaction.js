import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const Transaction = ({transaction}) => {
  const { deleteTransaction, convertCurrency } = useContext(GlobalContext)
 
    return (
        <li className={transaction.amount < 0 ? "minus": "plus" }>
            {transaction.text} <span>{convertCurrency(transaction.amount)}</span>
            <button onClick={()=> (deleteTransaction(transaction._id))} className="delete-btn">
                x
            </button>
        </li>
    )
}

export default Transaction
