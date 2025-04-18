import './app.css'
import Vendor from './components/vendor'
import Customer from './components/customer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/vendor' element={<Vendor />} />
          <Route path='/' element={<Customer />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
