import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.scss";

/**
 * HomePage - Página de inicio de la aplicación
 * 
 * Presenta información general del proyecto incluyendo las estructuras
 * de datos implementadas (Grafos y Árboles) y proporciona navegación
 * hacia la aplicación principal.
 */
export const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage__container">
        {/* Header */}
        <header className="homepage__header">
          <div className="homepage__header-icon"></div>
          <h1 className="homepage__header-title">
            Red de Ciudades Interconectadas
          </h1>
        </header>

        {/* Estructuras Used */}
        <div className="homepage__structures">
          <h2 className="homepage__structures-title">
            Estructuras de Datos Implementadas
          </h2>

          <div className="homepage__structures-grid">
            <div className="homepage__structures-item">
              <div className="homepage__structures-item-icon homepage__structures-item-icon--blue"></div>
              <h3 className="homepage__structures-item-title">
                Grafos
              </h3>
              <p className="homepage__structures-item-description">
                Representación de la red de ciudades interconectadas. Permite
                agregar, eliminar y conectar ciudades de forma dinámica.
              </p>
            </div>

            <div className="homepage__structures-item">
              <div className="homepage__structures-item-icon homepage__structures-item-icon--green"></div>
              <h3 className="homepage__structures-item-title">
                Árboles
              </h3>
              <p className="homepage__structures-item-description">
                Organización jerárquica de zonas verdes dentro de cada ciudad.
                Estructura de árbol para representar espacios anidados.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <footer className="homepage__footer">
          <div className="homepage__footer-content">
            <p className="homepage__footer-title">
              <strong>Estructura de Datos 2</strong> - Parcial 3
            </p>
            <p className="homepage__footer-subtitle">
              Juan David Trujillo Erazo
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
