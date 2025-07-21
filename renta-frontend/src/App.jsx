// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login-page/Login";
import SignIn from "./Login-page/SignIn";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
