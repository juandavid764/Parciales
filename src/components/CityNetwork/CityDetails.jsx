import React, { useState } from 'react';

/**
 * CityDetails - Componente para mostrar y gestionar detalles de una ciudad
 * 
 * Permite visualizar las zonas verdes de una ciudad en estructura de árbol,
 * agregar nuevas zonas verdes y editar las existentes.
 * 
 * @param {Object} city - Objeto Ciudad con datos y zonas verdes
 * @param {Function} onGreenZoneAdded - Callback para agregar zona verde
 * @param {Function} onGreenZoneUpdated - Callback para actualizar zona verde
 */
export const CityDetails = ({ city, onGreenZoneAdded, onGreenZoneUpdated }) => {
  const [isAddingZone, setIsAddingZone] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [formData, setFormData] = useState({
    parentZone: '',
    zoneName: '',
    description: ''
  });
  const [feedback, setFeedback] = useState('');

  const showFeedback = (message, type = 'info') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleAddZone = (e) => {
    e.preventDefault();
    if (!formData.zoneName.trim()) {
      showFeedback('Por favor ingresa un nombre para la zona verde', 'error');
      return;
    }

    const parentZone = formData.parentZone || city.name;
    
    if (onGreenZoneAdded(city.name, parentZone, formData.zoneName.trim(), formData.description.trim())) {
      showFeedback(`Zona verde "${formData.zoneName}" agregada exitosamente`, 'success');
      setFormData({ parentZone: '', zoneName: '', description: '' });
      setIsAddingZone(false);
    } else {
      showFeedback('Error al agregar la zona verde', 'error');
    }
  };

  const handleUpdateZone = (e) => {
    e.preventDefault();
    if (!editingZone) return;

    if (onGreenZoneUpdated(city.name, editingZone.name, formData.description.trim())) {
      showFeedback(`Zona verde "${editingZone.name}" actualizada`, 'success');
      setEditingZone(null);
      setFormData({ parentZone: '', zoneName: '', description: '' });
    } else {
      showFeedback('Error al actualizar la zona verde', 'error');
    }
  };

  const startEditing = (zone) => {
    setEditingZone(zone);
    setFormData({
      parentZone: '',
      zoneName: zone.name,
      description: zone.description
    });
    setIsAddingZone(false);
  };

  const cancelEditing = () => {
    setEditingZone(null);
    setIsAddingZone(false);
    setFormData({ parentZone: '', zoneName: '', description: '' });
  };

  const greenZones = city.getAllGreenZones();
  const availableParentZones = [city.name, ...greenZones.map(zone => zone.name)];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Detalles de {city.name}
        </h2>
          {!isAddingZone && !editingZone && (
          <button
            onClick={() => setIsAddingZone(true)}
            className="flex items-center px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
          >
            <span>Agregar Zona Verde</span>
          </button>
        )}
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

      {/* Add Zone Form */}
      {isAddingZone && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-900 mb-3">Agregar Nueva Zona Verde</h3>
          <form onSubmit={handleAddZone} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zona Padre
              </label>
              <select
                value={formData.parentZone}
                onChange={(e) => setFormData({...formData, parentZone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              >
                <option value="">Raíz de la ciudad ({city.name})</option>
                {greenZones.map(zone => (
                  <option key={zone.name} value={zone.name}>
                    {'  '.repeat(zone.level)}└─ {zone.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Zona
              </label>
              <input
                type="text"
                value={formData.zoneName}
                onChange={(e) => setFormData({...formData, zoneName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                placeholder="Nombre de la zona verde"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                rows="3"
                placeholder="Descripción de la zona verde"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Agregar Zona
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Zone Form */}
      {editingZone && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 mb-3">
            Editar: {editingZone.name}
          </h3>
          <form onSubmit={handleUpdateZone} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                rows="3"
                placeholder="Descripción de la zona verde"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Actualizar
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Green Zones Tree */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Zonas Verdes
          {greenZones.length > 0 && (
            <span className="text-sm text-gray-500 ml-2">({greenZones.length} total)</span>
          )}
        </h3>
        {greenZones.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No hay zonas verdes en esta ciudad</p>
            <p className="text-sm">¡Agrega la primera zona verde!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {renderTree(city.greenZones.root)}
          </div>
        )}
      </div>
    </div>
  );

  // Renderizado recursivo del árbol con UI mejorada
  function renderTree(node, level = 0, isLast = false) {
    // No mostrar el nodo raíz (es solo el contenedor)
    if (level === 0) {
      return node.children.map((child, idx) => renderTree(child, 1, idx === node.children.length - 1));
    }
    return (
      <div key={node.name} className="relative">
        {/* Conectores visuales tipo árbol */}
        <div style={{ position: 'absolute', left: (level - 1) * 32, top: 0, bottom: 0, width: 24 }}>
          {level > 1 && (
            <div className="h-full w-px bg-gray-300 ml-3" style={{ marginLeft: 8, height: isLast ? '1.5rem' : '100%' }}></div>
          )}
        </div>
        <div
          style={{ marginLeft: (level - 1) * 32 }}
          className={`flex items-start gap-2 py-2 pl-2 rounded-lg transition-colors group ${level === 1 ? 'bg-green-50 border border-green-200' : 'hover:bg-green-50'}`}
        >
          {/* Rama horizontal */}
          {level > 1 && (
            <span className="block w-6 h-px bg-gray-300 mt-4 mr-1" />
          )}
          {/* Icono de nodo */}
          <span className="text-green-700 text-lg select-none">
            {node.children.length > 0 ? '🌳' : '🌱'}
          </span>
          {/* Contenido del nodo */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-green-900 flex items-center">
              {node.name}
            </div>
          </div>
          <button
            onClick={() => startEditing({ name: node.name, description: node.description })}
            className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            Editar
          </button>
        </div>
        {/* Renderizar hijos recursivamente */}
        <div className="w-full">
          {node.children.map((child, idx) => renderTree(child, level + 1, idx === node.children.length - 1))}
        </div>
      </div>
    );
  }
};
