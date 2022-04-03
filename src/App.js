import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserPage from "./components/UserPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="user" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
