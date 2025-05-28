import React, { useState } from 'react';

/**
 * CityList - Lista de ciudades en la red
 * 
 * Muestra todas las ciudades disponibles, permite seleccionar una ciudad
 * para ver sus detalles y eliminar ciudades de la red con confirmación.
 * 
 * @param {Array} cities - Lista de nombres de ciudades
 * @param {string} selectedCity - Ciudad actualmente seleccionada
 * @param {Function} onCitySelected - Callback para seleccionar ciudad
 * @param {Function} onCityRemoved - Callback para eliminar ciudad
 * @param {Function} getCityStats - Función para obtener estadísticas de ciudad
 */
export const CityList = ({ cities, selectedCity, onCitySelected, onCityRemoved, getCityStats }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleRemoveCity = (cityName) => {
    if (confirmDelete === cityName) {
      onCityRemoved(cityName);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(cityName);
      setTimeout(() => setConfirmDelete(null), 3000); // Auto-cancel after 3 seconds
    }
  };

  if (cities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Lista de Ciudades</h2>
        <p className="text-gray-500 text-center py-8">
          No hay ciudades en la red. ¡Agrega la primera ciudad!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Lista de Ciudades ({cities.length})
      </h2>
      
      <div className="space-y-3">
        {cities.map(cityName => (
          <div
            key={cityName}
            className="p-4 border rounded-lg cursor-pointer transition-all border-gray-200 hover:border-gray-300 hover:shadow-sm flex items-center justify-between"
            onClick={() => onCitySelected(cityName)}
          >
            <h3 className="font-semibold text-gray-900">{cityName}</h3>
            <button
              onClick={e => {
                e.stopPropagation();
                handleRemoveCity(cityName);
              }}
              className="ml-4 px-2 py-1 text-xs rounded bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
              title="Eliminar ciudad"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
        <div className="mt-4 text-xs text-gray-500">
        Haz clic en una ciudad para ver sus detalles
      </div>
    </div>
  );
};
