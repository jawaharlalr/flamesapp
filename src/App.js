import { Routes, Route } from "react-router-dom";
import FlamesCalculator from "./components/FlamesCalculator";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FlamesCalculator />} />
      <Route path="/whatbro" element={<Login />} />
      <Route path="/matikitapangu" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
