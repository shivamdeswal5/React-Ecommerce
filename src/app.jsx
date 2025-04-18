import './app.css'
import Vendor from './components/vendor'
import Customer from './components/customer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartItem from './components/cart-items'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/vendor' element={<Vendor />} />
          <Route path='/' element={<Customer />} />
          <Route path='/cart' element={<CartItem />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
