import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserPage from "./components/UserPage";

function App() {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="user"
          element={isAuthenticated ? <UserPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
