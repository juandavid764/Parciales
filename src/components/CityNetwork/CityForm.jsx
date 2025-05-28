import React, { useState } from 'react';

/**
 * CityForm - Formulario para gestión de ciudades
 * 
 * Permite agregar nuevas ciudades, conectar ciudades existentes 
 * y desconectar ciudades en la red. Utiliza pestañas para organizar
 * las diferentes funcionalidades.
 * 
 * @param {Function} onCityAdded - Callback para agregar ciudad
 * @param {Function} onCityConnected - Callback para conectar ciudades
 * @param {Function} onCityDisconnected - Callback para desconectar ciudades
 * @param {Array} availableCities - Lista de ciudades disponibles para conexiones
 */
export const CityForm = ({ onCityAdded, onCityConnected, onCityDisconnected, availableCities }) => {
  const [newCityName, setNewCityName] = useState('');
  const [connectionCity1, setConnectionCity1] = useState('');
  const [connectionCity2, setConnectionCity2] = useState('');
  const [activeTab, setActiveTab] = useState('add'); // 'add', 'connect', 'disconnect'
  const [feedback, setFeedback] = useState('');

  const showFeedback = (message, type = 'info') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!newCityName.trim()) {
      showFeedback('Por favor ingresa un nombre de ciudad', 'error');
      return;
    }

    if (onCityAdded(newCityName.trim())) {
      showFeedback(`Ciudad "${newCityName}" agregada exitosamente`, 'success');
      setNewCityName('');
    } else {
      showFeedback(`La ciudad "${newCityName}" ya existe`, 'error');
    }
  };

  const handleConnectCities = (e) => {
    e.preventDefault();
    if (!connectionCity1 || !connectionCity2) {
      showFeedback('Selecciona ambas ciudades para conectar', 'error');
      return;
    }

    if (connectionCity1 === connectionCity2) {
      showFeedback('No puedes conectar una ciudad consigo misma', 'error');
      return;
    }

    if (onCityConnected(connectionCity1, connectionCity2)) {
      showFeedback(`Ciudades conectadas: ${connectionCity1} ↔ ${connectionCity2}`, 'success');
      setConnectionCity1('');
      setConnectionCity2('');
    } else {
      showFeedback('Error al conectar las ciudades o ya están conectadas', 'error');
    }
  };

  const handleDisconnectCities = (e) => {
    e.preventDefault();
    if (!connectionCity1 || !connectionCity2) {
      showFeedback('Selecciona ambas ciudades para desconectar', 'error');
      return;
    }

    if (onCityDisconnected(connectionCity1, connectionCity2)) {
      showFeedback(`Ciudades desconectadas: ${connectionCity1} ↔ ${connectionCity2}`, 'success');
      setConnectionCity1('');
      setConnectionCity2('');
    } else {
      showFeedback('Error al desconectar las ciudades', 'error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestión de Ciudades</h2>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4">
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'add'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Agregar 
        </button>
        <button
          onClick={() => setActiveTab('connect')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'connect'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Conectar
        </button>
        <button
          onClick={() => setActiveTab('disconnect')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'disconnect'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Desconectar
        </button>
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div className={`mb-4 p-3 rounded-md text-sm ${
          feedback.type === 'success' ? 'bg-green-100 text-green-700' :
          feedback.type === 'error' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Add City Tab */}
      {activeTab === 'add' && (
        <form onSubmit={handleAddCity} className="space-y-4">
          <div>
            <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Ciudad
            </label>
            <input
              type="text"
              id="cityName"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              placeholder="Ingresa el nombre de la ciudad"
            />
          </div>          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <span>Agregar Ciudad</span>
          </button>
        </form>
      )}

      {/* Connect Cities Tab */}
      {activeTab === 'connect' && (
        <form onSubmit={handleConnectCities} className="space-y-4">
          <div>
            <label htmlFor="city1" className="block text-sm font-medium text-gray-700 mb-2">
              Primera Ciudad
            </label>
            <select
              id="city1"
              value={connectionCity1}
              onChange={(e) => setConnectionCity1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              <option value="">Selecciona una ciudad</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city2" className="block text-sm font-medium text-gray-700 mb-2">
              Segunda Ciudad
            </label>
            <select
              id="city2"
              value={connectionCity2}
              onChange={(e) => setConnectionCity2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              <option value="">Selecciona una ciudad</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Conectar Ciudades
          </button>
        </form>
      )}

      {/* Disconnect Cities Tab */}
      {activeTab === 'disconnect' && (
        <form onSubmit={handleDisconnectCities} className="space-y-4">
          <div>
            <label htmlFor="disconnectCity1" className="block text-sm font-medium text-gray-700 mb-2">
              Primera Ciudad
            </label>
            <select
              id="disconnectCity1"
              value={connectionCity1}
              onChange={(e) => setConnectionCity1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              <option value="">Selecciona una ciudad</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="disconnectCity2" className="block text-sm font-medium text-gray-700 mb-2">
              Segunda Ciudad
            </label>
            <select
              id="disconnectCity2"
              value={connectionCity2}
              onChange={(e) => setConnectionCity2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              <option value="">Selecciona una ciudad</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Desconectar Ciudades
          </button>
        </form>
      )}
    </div>
  );
};
