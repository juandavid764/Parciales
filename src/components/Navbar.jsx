import { Link } from "react-router-dom";

/**
 * Navbar - Componente de navegación principal
 * 
 * Proporciona navegación entre las diferentes páginas de la aplicación.
 * Incluye logo de la aplicación y enlaces de navegación.
 */
export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg mr-3 group-hover:scale-105 transition-transform"></div>
            <span className="font-semibold text-lg text-gray-900">
              CityNetwork
            </span>
          </Link>
          {/* Navigation Links */}
          <div className="flex space-x-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-transparent text-blue-700 hover:bg-blue-100 hover:text-blue-900"
            >
              Inicio
            </Link>
            <Link
              to="/CityNetworkPage"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-transparent text-blue-700 hover:bg-blue-100 hover:text-blue-900"
            >
              Red de Ciudades
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
