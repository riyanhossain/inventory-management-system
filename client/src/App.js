import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import ForgetPassword from "./components/ForgetPassword";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import VerifyEmail from "./components/VerifyEmail";
export const UserContext = createContext();

function App() {

  const [user, setUser] = useState({
    signIn: false,
  });


  return (
    <UserContext.Provider value={[user, setUser]}>
      <Navbar />
      <Routes>
        {!user.signIn ? <Route path="/" element={<Login />} />: <Route path="/" element={< Category/>} />}
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail/>} />
        <Route path="/product-list" element={<ProductList/>} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
