import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import Navbar from "./components/Navbar";
import VehicleRentalPage from "./pages/VehicleRentalPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditVehicleRentalPage from "./pages/EditVehicleRentalPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage  from "./pages/RegisterPage"

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<VehicleRentalPage />} />
            <Route path="/add-rental" element={<AddVehicleRentalPage />} />
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
<Route path="/edit/:id" element={<EditVehicleRentalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
