import "./app.css";
import Vendor from "./components/vendor";
import Customer from "./components/customer";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import CartItem from "./components/cart-items";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProtectedRoute from "./routes/protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
    
          <Route path="/" element={<Navigate to="/signup" />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/vendor"
            element={
              <ProtectedRoute role="vendor" redirectTo="/customer">
                <Vendor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer"
            element={
              <ProtectedRoute role="customer" redirectTo="/vendor">
                <Customer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute role="customer" redirectTo="/vendor">
                <CartItem />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
