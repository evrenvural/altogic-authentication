import React, { useState, useEffect, useContext } from "react"
import storage from "../configs/storage"

const Context = React.createContext(null)

const useFetch = () => {
  const [auth, setAuth] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    storage.get(storage.KEY_AUTH).then((authFromStorage) => {
      setAuth(authFromStorage)
      setIsAuthLoading(false)
    })
  }, [])

  return [auth, isAuthLoading, setIsAuthLoading]
}

const Provider = ({ children }) => {
  const [fetchedAuth, isAuthLoading, setIsAuthLoading] = useFetch()
  const [auth, setAuth] = useState(fetchedAuth)

  useEffect(() => {
    setAuth(fetchedAuth)
  }, [fetchedAuth])

  useEffect(() => {
    storage.set(storage.KEY_AUTH, auth)
  }, [auth])

  return (
    <Context.Provider
      value={[auth, setAuth, isAuthLoading, setIsAuthLoading]}
    >
      {children}
    </Context.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(Context)
  return context
}

export default Provider
