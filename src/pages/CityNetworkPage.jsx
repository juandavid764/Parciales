import React, { useState, useEffect } from 'react';
import { Graph } from '../Models/Graph.js';
import { CityForm } from '../components/CityNetwork/CityForm.jsx';
import { CityList } from '../components/CityNetwork/CityList.jsx';
import { CityDetails } from '../components/CityNetwork/CityDetails.jsx';
import { NetworkVisualization } from '../components/CityNetwork/NetworkVisualization.jsx';
import { CityStatistics } from '../components/CityNetwork/CityStatistics.jsx';

export const CityNetworkPage = () => {
  const [cityNetwork] = useState(new Graph());
  const [selectedCity, setSelectedCity] = useState(null);
  const [networkData, setNetworkData] = useState({ nodes: [], edges: [] });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Initialize with sample data
  useEffect(() => {
    // Add sample cities
    cityNetwork.addCity('Bogotá');
    cityNetwork.addCity('Medellín');
    cityNetwork.addCity('Cali');
    cityNetwork.addCity('Barranquilla');

    // Connect cities
    cityNetwork.connectCities('Bogotá', 'Medellín');
    cityNetwork.connectCities('Bogotá', 'Cali');
    cityNetwork.connectCities('Medellín', 'Cali');
    cityNetwork.connectCities('Cali', 'Barranquilla');

    // Add sample green zones
    cityNetwork.addGreenZoneToCity('Bogotá', 'Bogotá', 'Parque Simón Bolívar', 'Gran parque central');
    cityNetwork.addGreenZoneToCity('Bogotá', 'Parque Simón Bolívar', 'Zona Deportiva', 'Área para deportes');
    cityNetwork.addGreenZoneToCity('Bogotá', 'Parque Simón Bolívar', 'Zona Recreativa', 'Área familiar');
    cityNetwork.addGreenZoneToCity('Bogotá', 'Zona Recreativa', 'Juegos Infantiles', 'Para niños');

    cityNetwork.addGreenZoneToCity('Medellín', 'Medellín', 'Parque Arví', 'Parque ecológico');
    cityNetwork.addGreenZoneToCity('Medellín', 'Parque Arví', 'Senderos', 'Caminos naturales');

    cityNetwork.addGreenZoneToCity('Cali', 'Cali', 'Parque del Río', 'Parque junto al río');

    setSelectedCity('Bogotá');
    updateNetworkData();
  }, []);

  const updateNetworkData = () => {
    setNetworkData(cityNetwork.getNetworkData());
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCityAdded = (cityName) => {
    if (cityNetwork.addCity(cityName)) {
      updateNetworkData();
      return true;
    }
    return false;
  };

  const handleCityRemoved = (cityName) => {
    if (cityNetwork.removeCity(cityName)) {
      if (selectedCity === cityName) {
        setSelectedCity(null);
      }
      updateNetworkData();
      return true;
    }
    return false;
  };

  const handleCityConnected = (city1, city2) => {
    if (cityNetwork.connectCities(city1, city2)) {
      updateNetworkData();
      return true;
    }
    return false;
  };

  const handleCityDisconnected = (city1, city2) => {
    if (cityNetwork.disconnectCities(city1, city2)) {
      updateNetworkData();
      return true;
    }
    return false;
  };

  const handleGreenZoneAdded = (cityName, parentZone, zoneName, description) => {
    if (cityNetwork.addGreenZoneToCity(cityName, parentZone, zoneName, description)) {
      updateNetworkData();
      return true;
    }
    return false;
  };

  const handleGreenZoneUpdated = (cityName, zoneName, newDescription) => {
    if (cityNetwork.updateGreenZoneInCity(cityName, zoneName, newDescription)) {
      updateNetworkData();
      return true;
    }
    return false;
  };

  const selectedCityData = selectedCity ? cityNetwork.getCity(selectedCity) : null;
  const selectedCityStats = selectedCity ? cityNetwork.getCityStatistics(selectedCity) : null;
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Red de Ciudades Interconectadas
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - City Management */}
          <div className="lg:col-span-1 space-y-6">
            <CityForm
              onCityAdded={handleCityAdded}
              onCityConnected={handleCityConnected}
              onCityDisconnected={handleCityDisconnected}
              availableCities={cityNetwork.getAllCities()}
            />
            
            <CityList
              cities={cityNetwork.getAllCities()}
              selectedCity={selectedCity}
              onCitySelected={setSelectedCity}
              onCityRemoved={handleCityRemoved}
              getCityStats={(cityName) => cityNetwork.getCityStatistics(cityName)}
            />
          </div>

          {/* Right Panel - City Details and Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <NetworkVisualization
              networkData={networkData}
              onCitySelected={setSelectedCity}
              selectedCity={selectedCity}
            />

            {selectedCityStats && (
              <CityStatistics statistics={selectedCityStats} />
            )}

            {selectedCityData && (
              <CityDetails
                city={selectedCityData}
                onGreenZoneAdded={handleGreenZoneAdded}
                onGreenZoneUpdated={handleGreenZoneUpdated}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
