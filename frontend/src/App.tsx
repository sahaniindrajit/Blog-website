import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import Signup from './routes/Signup'
import Signin from './routes/Signin'
import Blog from './routes/Blog'
import Failed from './routes/Failed'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/blog' element={<Blog/>} />
          <Route path='/failed' element={<Failed/>}/>
          <Route path='*' element={<div>404 Page not found</div>} />
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
