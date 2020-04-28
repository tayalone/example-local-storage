import React, { useState, useEffect } from 'react'

import LoadingScreen from './Components/LoadingScreen'

import delay from './utils/delay'
import logo from './logo.svg'
import './App.css'
import fetchData from './utils/fetchData'

function App() {
  const [checkLocalStorage, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await delay(5000)
        const userId = localStorage.getItem('app-user._id')
        if (userId) {
          const userData = await fetchData(userId)
          setUser({ ...userData })
          localStorage.setItem('app-user._id', userData._id)
        }
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchUserData()
  }, [])
  const handleLogin = async () => {
    setLoading(true)
    await delay(2500)

    const userData = await fetchData('1')
    setUser({ ...userData })
    localStorage.setItem('app-user._id', userData._id)

    await delay(500)
    setLoading(false)
  }
  const handleLogOut = async () => {
    setLoading(true)
    await delay(2500)

    setUser(null)
    localStorage.removeItem('app-user._id')

    await delay(500)
    setLoading(false)
  }

  return (
    <div className="App">
      {checkLocalStorage ? <LoadingScreen /> : null}

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {user ? (
          <div>
            <h1>Hi!! {user.name}</h1>
          </div>
        ) : null}
        <div>
          {user ? (
            <button onClick={() => handleLogOut()}>logout</button>
          ) : (
            <button onClick={() => handleLogin()}>login</button>
          )}
        </div>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  )
}

export default App
