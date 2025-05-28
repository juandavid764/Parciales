import { Tree } from './Tree.js';

/**
 * City - Clase que representa una ciudad con zonas verdes
 * 
 * Cada ciudad tiene un nombre y un árbol de zonas verdes organizadas
 * jerárquicamente. Proporciona métodos para gestionar zonas verdes
 * y obtener estadísticas de la ciudad.
 */
export class City {
  constructor(name) {
    this.name = name;
    this.greenZones = new Tree(`${name}-GreenZones`);
  }

  /**
   * Add a green zone to the city
   * @param {string} parentZone - Parent zone name (use city name for root level)
   * @param {string} zoneName - Name of the new zone
   * @param {string} description - Description of the zone
   * @returns {boolean} - Success status
   */
  addGreenZone(parentZone, zoneName, description = '') {
    // If parentZone is the city name, add to root
    const actualParent = parentZone === this.name ? `${this.name}-GreenZones` : parentZone;
    return this.greenZones.addGreenZone(actualParent, zoneName, description);
  }

  /**
   * Update a green zone's description
   * @param {string} zoneName - Name of the zone to update
   * @param {string} newDescription - New description
   * @returns {boolean} - Success status
   */
  updateGreenZone(zoneName, newDescription) {
    return this.greenZones.updateGreenZone(zoneName, newDescription);
  }

  /**
   * Get the maximum height of green zones tree
   * @returns {number} - Maximum depth
   */
  getMaxGreenZoneHeight() {
    return this.greenZones.getMaxHeight();
  }

  /**
   * Get total number of green zones
   * @returns {number} - Total count
   */
  getTotalGreenZones() {
    return this.greenZones.getTotalGreenZones();
  }

  /**
   * Get all green zones for display
   * @returns {Array} - Array of zones with level information
   */
  getAllGreenZones() {
    return this.greenZones.getAllZones();
  }

  /**
   * Check if a green zone exists
   * @param {string} zoneName - Name to check
   * @returns {boolean} - Whether the zone exists
   */
  hasGreenZone(zoneName) {
    return this.greenZones.hasZone(zoneName);
  }

  /**
   * Get city statistics
   * @returns {Object} - Statistics object
   */
  getStatistics() {
    return {
      name: this.name,
      maxGreenZoneHeight: this.getMaxGreenZoneHeight(),
      totalGreenZones: this.getTotalGreenZones()
    };
  }
}
