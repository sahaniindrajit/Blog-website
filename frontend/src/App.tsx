import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import Signup from './routes/Signup'
import Signin from './routes/Signin'
import Blog from './routes/Blog'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/' element={<Blog/>} />
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
