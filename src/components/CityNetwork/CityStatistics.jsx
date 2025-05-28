import React from 'react';

/**
 * CityStatistics - Panel de estadísticas de una ciudad
 * 
 * Muestra métricas importantes de una ciudad seleccionada incluyendo
 * total de zonas verdes, altura máxima del árbol, conexiones y estado
 * en la red.
 * 
 * @param {Object} statistics - Objeto con estadísticas de la ciudad
 */
export const CityStatistics = ({ statistics }) => {
  if (!statistics) {
    return null;
  }

  const {
    name,
    maxGreenZoneHeight,
    totalGreenZones,
    connectedCities,
    connectionCount
  } = statistics;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Estadísticas de {name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Green Zones */}        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Zonas Verdes</p>
              <p className="text-2xl font-bold text-green-900">{totalGreenZones}</p>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-1">Total de zonas verdes</p>
        </div>

        {/* Max Height */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Altura Máxima</p>
              <p className="text-2xl font-bold text-blue-900">{maxGreenZoneHeight}</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-1">Profundidad del árbol</p>
        </div>

        {/* Connections */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Conexiones</p>
              <p className="text-2xl font-bold text-purple-900">{connectionCount}</p>
            </div>
          </div>
          <p className="text-xs text-purple-600 mt-1">Ciudades conectadas</p>
        </div>

        {/* Network Status */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">Estado</p>
              <p className="text-sm font-bold text-orange-900">
                {connectionCount > 0 ? 'Conectada' : 'Aislada'}
              </p>
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-1">Estado en la red</p>
        </div>
      </div>
    </div>
  );
};
