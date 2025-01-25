import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'


function App() {
  return (
    <div className='h-[100vh] w-full'> 
    <NavBar/>
      <Router>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/search' element={<SearchPage/>}></Route>

        </Routes>
      </Router>
    </div>
  )
}

export default App
