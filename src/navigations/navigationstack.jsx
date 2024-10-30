import { Route, Routes, useNavigate } from "react-router-dom";
import UserForm from "../form/form";
import Cherial from "../input/Cherial"; // Replace with the correct path to Cherial component

const NavigationStack = () => {
  const navigate = useNavigate();

  // Callback to navigate to Cherial upon successful login
  const handleLoginSuccess = () => {
    navigate("/input"); // Navigate to Cherial component
  };

  return (
    <Routes>
      <Route path="/" element={<UserForm onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/input" element={<Cherial />} />
    </Routes>
  );
};

export default NavigationStack;
