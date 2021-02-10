import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

// Initial state
    const initialState = {
        transactions: [],
        error: null,
        loader: true
    }

// Create global context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/transactions')

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            axios.delete(`/api/transactions/${id}`)
            
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
        
        
    }

    async function addTransaction(id, text, amount) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/transactions', {text, amount}, config)

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }  
    }

    function convertCurrency(amount)  {
        return Number(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD'})
     }

    return (
        <GlobalContext.Provider value= {{
            transactions: state.transactions,
            loading: state.loading,
            error: state.error,
            getTransactions,
            deleteTransaction,
            addTransaction,
            convertCurrency
        }} >
            {children}
        </GlobalContext.Provider>
    )
}