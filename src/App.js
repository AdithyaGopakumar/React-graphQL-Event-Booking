import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './styles/App.css';
import Auth from "./pages/auth";
import Events from "./pages/events";
import Booking from "./pages/bookings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/auth" />} exact />
        <Route path='/auth' element={<Auth />} />
        <Route path='/events' element={<Events />} />
        <Route path='/bookings' element={<Booking />} />
        <Route path='*' element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;