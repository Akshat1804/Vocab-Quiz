import React from 'react'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import Page1 from './Pages/Page1'
import Quiz from './Pages/Quiz'
import Words from './Components/Words'


const App = () => {

  


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Dashboard' element={<Page1 />} />
        <Route path='/Quiz' element={<Quiz />} />
        <Route path='/Words' element={<Words />} />
      </Routes>
    </div>
  )
}

export default App