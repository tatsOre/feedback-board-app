import { createContext, useContext, useState } from 'react'

export const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    text: '',
    type: 'success',
    active: false,
  })

  const sendAlert = (text) => {
    setAlert({ text, type: 'success', active: true })
  }

  const sendError = (text) => {
    setAlert({ text, type: 'error', active: true })
  }

  const resetAlert = () => {
    setAlert({ text: '', type: 'success', active: false })
  }

  return (
    <AlertContext.Provider
      value={{ alert, setAlert, sendAlert, sendError, resetAlert }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)
