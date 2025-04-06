import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserContextProvider from './context/TodoContextProvider'
import TodoList from './components/TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserContextProvider>
        <TodoList/>
      </UserContextProvider>
    </>
  )
}

export default App
