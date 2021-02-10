import { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const AddTransaction = () => {
    const { transactions, addTransaction } = useContext(GlobalContext)

    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0)

    const newTransaction = (event) => {
        event.preventDefault()
        addTransaction(transactions.length+1, text, Number(amount))
    }

    return (
        <>
         <h3>Add new transaction</h3>
         <form onSubmit={newTransaction}>
                <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                <label htmlFor="amount"
                    >Amount <br />
                    (negative - expense, positive - income)
                    </label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>   
        </>
    )
}

export default AddTransaction
