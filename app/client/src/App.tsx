import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'


function App() {
  return (
    <div className='h-[100vh] w-full'> 
      <Router>
    <NavBar/>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/search' element={<SearchPage/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
