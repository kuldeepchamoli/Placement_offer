import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlacementRequestForm from "./PlacementRequestForm.jsx";
import LoginPage from "./LoginPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/placement" element={<PlacementRequestForm />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
