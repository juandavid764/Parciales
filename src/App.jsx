import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage.jsx";
import { Cliente } from "./pages/Cliente.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas publicas  */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cliente/:nombre" element={<Cliente />} />
      </Routes>
    </Router>
  );
}

export default App;