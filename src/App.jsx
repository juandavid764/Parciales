import "./App.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { PublicRoutes } from "./Routes/PublicRoutes";

/**
 * App - Componente principal de la aplicación
 * 
 * Configura el enrutamiento y la estructura general de la aplicación.
 * Proporciona un layout con navegación y contenido principal.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <PublicRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;