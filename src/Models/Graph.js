import { City } from './City.js';

/**
 * Graph - Clase para representar la red de ciudades interconectadas
 * 
 * Implementa un grafo no dirigido usando lista de adyacencia para representar
 * las conexiones entre ciudades. Cada ciudad es un nodo que contiene
 * sus propias zonas verdes organizadas en árbol.
 */
export class Graph {
  constructor() {
    this.cities = new Map(); // Map of city name -> City object
    this.adjList = {}; // Adjacency list for city connections
  }

  /**
   * Add a new city to the network
   * @param {string} cityName - Name of the city
   * @returns {boolean} - Success status
   */
  addCity(cityName) {
    if (this.cities.has(cityName)) {
      return false; // City already exists
    }
    
    const city = new City(cityName);
    this.cities.set(cityName, city);
    this.adjList[cityName] = [];
    return true;
  }

  /**
   * Remove a city from the network
   * @param {string} cityName - Name of the city to remove
   * @returns {boolean} - Success status
   */
  removeCity(cityName) {
    if (!this.cities.has(cityName)) {
      return false; // City doesn't exist
    }

    // Remove all connections to this city
    for (let connectedCity of this.adjList[cityName]) {
      this.adjList[connectedCity] = this.adjList[connectedCity].filter(
        city => city !== cityName
      );
    }

    // Remove the city
    this.cities.delete(cityName);
    delete this.adjList[cityName];
    return true;
  }

  /**
   * Connect two cities
   * @param {string} city1 - Name of first city
   * @param {string} city2 - Name of second city
   * @returns {boolean} - Success status
   */
  connectCities(city1, city2) {
    if (!this.cities.has(city1) || !this.cities.has(city2)) {
      return false; // One or both cities don't exist
    }

    if (city1 === city2) {
      return false; // Can't connect city to itself
    }

    // Check if connection already exists
    if (this.adjList[city1].includes(city2)) {
      return false; // Connection already exists
    }

    this.adjList[city1].push(city2);
    this.adjList[city2].push(city1); // Undirected graph
    return true;
  }

  /**
   * Disconnect two cities
   * @param {string} city1 - Name of first city
   * @param {string} city2 - Name of second city
   * @returns {boolean} - Success status
   */
  disconnectCities(city1, city2) {
    if (!this.cities.has(city1) || !this.cities.has(city2)) {
      return false;
    }

    this.adjList[city1] = this.adjList[city1].filter(city => city !== city2);
    this.adjList[city2] = this.adjList[city2].filter(city => city !== city1);
    return true;
  }

  /**
   * Get a city object by name
   * @param {string} cityName - Name of the city
   * @returns {City|null} - City object or null if not found
   */
  getCity(cityName) {
    return this.cities.get(cityName) || null;
  }

  /**
   * Get all cities
   * @returns {Array} - Array of city names
   */
  getAllCities() {
    return Array.from(this.cities.keys());
  }

  /**
   * Get connected cities for a given city
   * @param {string} cityName - Name of the city
   * @returns {Array} - Array of connected city names
   */
  getConnectedCities(cityName) {
    return this.adjList[cityName] || [];
  }

  /**
   * Check if a city exists
   * @param {string} cityName - Name of the city
   * @returns {boolean} - Whether the city exists
   */
  hasCity(cityName) {
    return this.cities.has(cityName);
  }

  /**
   * Get statistics for a specific city
   * @param {string} cityName - Name of the city
   * @returns {Object|null} - City statistics or null if city doesn't exist
   */
  getCityStatistics(cityName) {
    const city = this.getCity(cityName);
    if (!city) {
      return null;
    }

    return {
      ...city.getStatistics(),
      connectedCities: this.getConnectedCities(cityName),
      connectionCount: this.getConnectedCities(cityName).length
    };
  }

  /**
   * Get the entire network as an object for visualization
   * @returns {Object} - Network representation
   */
  getNetworkData() {
    const nodes = this.getAllCities().map(cityName => {
      const city = this.getCity(cityName);
      return {
        id: cityName,
        label: cityName,
        ...city.getStatistics()
      };
    });

    const edges = [];
    const processed = new Set();

    for (let cityName of this.getAllCities()) {
      for (let connectedCity of this.getConnectedCities(cityName)) {
        const edgeKey = [cityName, connectedCity].sort().join('-');
        if (!processed.has(edgeKey)) {
          edges.push({
            from: cityName,
            to: connectedCity
          });
          processed.add(edgeKey);
        }
      }
    }

    return { nodes, edges };
  }

  /**
   * Add a green zone to a specific city
   * @param {string} cityName - Name of the city
   * @param {string} parentZone - Parent zone name
   * @param {string} zoneName - Name of the new zone
   * @param {string} description - Description of the zone
   * @returns {boolean} - Success status
   */
  addGreenZoneToCity(cityName, parentZone, zoneName, description = '') {
    const city = this.getCity(cityName);
    if (!city) {
      return false;
    }
    return city.addGreenZone(parentZone, zoneName, description);
  }

  /**
   * Update a green zone in a specific city
   * @param {string} cityName - Name of the city
   * @param {string} zoneName - Name of the zone to update
   * @param {string} newDescription - New description
   * @returns {boolean} - Success status
   */
  updateGreenZoneInCity(cityName, zoneName, newDescription) {
    const city = this.getCity(cityName);
    if (!city) {
      return false;
    }
    return city.updateGreenZone(zoneName, newDescription);
  }
}
