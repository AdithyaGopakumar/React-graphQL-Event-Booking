import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './styles/App.css';
import Auth from "./pages/auth";
import Events from "./pages/events";
import Booking from "./pages/bookings";
import Header from "./components/navbar";
import AuthContext from "./context/auth.context";
import { useState } from "react";


const App = () => {

  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = (token, user_id, tokenExpiration) => {
    setToken(token)
    setUserId(user_id)
  }
  const logout = () => {
    setToken(null)
    setUserId(null)
  }

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ token, user_id: userId, login, logout }}>
          <Header />
          <Routes>
            <Route path="/" element={token ? <Navigate to="/events" /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={token ? <Navigate to="/events" /> : <Auth />} />
            <Route path="/events" element={<Events />} />
            <Route path="/bookings" element={token ? <Booking /> : <Navigate to="/auth" />} />
            <Route path="*" element={token ? <Navigate to="/events" /> : <Navigate to="/auth" />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;