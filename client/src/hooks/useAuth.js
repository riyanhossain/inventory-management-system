import React from 'react'
import axios from 'axios'

export default function useAuth({email, password}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [userInfo, setUser] = React.useState(null)
  const [error, setError] = React.useState(null)

  const login = async ({email, password}) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', {email, password})
      const data = await response.json()
        setIsAuthenticated(true)
        setUser(data.user)
    } catch (error) {
      setError(error)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return {isAuthenticated, userInfo, login, logout, error}

}