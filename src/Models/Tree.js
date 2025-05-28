/**
 * TreeNode - Clase nodo para representar zonas verdes en estructura jerárquica
 * 
 * Cada nodo representa una zona verde con nombre, descripción y puede
 * tener zonas hijas (sub-zonas). Proporciona métodos para navegación
 * y manipulación del árbol.
 */
export class TreeNode {
  constructor(name, description = '') {
    this.name = name;
    this.description = description;
    this.children = [];
    this.parent = null;
  }

  /**
   * Add a child node (subzone) to this node
   * @param {TreeNode} child - The child node to add
   */
  addChild(child) {
    if (child instanceof TreeNode) {
      child.parent = this;
      this.children.push(child);
    }
  }

  /**
   * Remove a child node by name
   * @param {string} name - Name of the child to remove
   */
  removeChild(name) {
    this.children = this.children.filter(child => child.name !== name);
  }

  /**
   * Find a node by name in the subtree
   * @param {string} name - Name to search for
   * @returns {TreeNode|null} - Found node or null
   */
  findNode(name) {
    if (this.name === name) {
      return this;
    }
    
    for (let child of this.children) {
      const found = child.findNode(name);
      if (found) {
        return found;
      }
    }
    
    return null;
  }

  /**
   * Get the depth/height of this node in the tree
   * @returns {number} - The maximum depth from this node
   */
  getMaxDepth() {
    if (this.children.length === 0) {
      return 1;
    }
    
    let maxChildDepth = 0;
    for (let child of this.children) {
      const childDepth = child.getMaxDepth();
      maxChildDepth = Math.max(maxChildDepth, childDepth);
    }
    
    return maxChildDepth + 1;
  }

  /**
   * Count total number of nodes in the subtree (including this node)
   * @returns {number} - Total count of nodes
   */
  getTotalNodeCount() {
    let count = 1; // Count this node
    
    for (let child of this.children) {
      count += child.getTotalNodeCount();
    }
    
    return count;
  }

  /**
   * Convert tree to a flat array for easier rendering
   * @param {number} level - Current level in the tree
   * @returns {Array} - Flat array of nodes with level information
   */
  toFlatArray(level = 0) {
    const result = [{
      name: this.name,
      description: this.description,
      level: level,
      hasChildren: this.children.length > 0
    }];

    for (let child of this.children) {
      result.push(...child.toFlatArray(level + 1));
    }

    return result;
  }
}

/**
 * Tree - Clase para gestionar zonas verdes jerárquicamente
 * 
 * Implementa un árbol de zonas verdes con un nodo raíz. Proporciona
 * métodos para agregar, actualizar y consultar zonas verdes de manera
 * jerárquica dentro de una ciudad.
 */
export class Tree {
  constructor(rootName = 'Root') {
    this.root = new TreeNode(rootName);
  }

  /**
   * Add a green zone to the tree
   * @param {string} parentName - Name of the parent zone
   * @param {string} name - Name of the new zone
   * @param {string} description - Description of the zone
   * @returns {boolean} - Success status
   */
  addGreenZone(parentName, name, description = '') {
    const parentNode = this.root.findNode(parentName);
    if (parentNode) {
      const newNode = new TreeNode(name, description);
      parentNode.addChild(newNode);
      return true;
    }
    return false;
  }

  /**
   * Update a green zone's information
   * @param {string} name - Name of the zone to update
   * @param {string} newDescription - New description
   * @returns {boolean} - Success status
   */
  updateGreenZone(name, newDescription) {
    const node = this.root.findNode(name);
    if (node) {
      node.description = newDescription;
      return true;
    }
    return false;
  }

  /**
   * Get the maximum height of the tree
   * @returns {number} - Maximum depth
   */
  getMaxHeight() {
    return this.root.getMaxDepth() - 1; // Subtract 1 because we don't count the root
  }

  /**
   * Get total number of green zones (excluding root)
   * @returns {number} - Total count
   */
  getTotalGreenZones() {
    return this.root.getTotalNodeCount() - 1; // Subtract 1 for root
  }

  /**
   * Get all green zones as a flat array
   * @returns {Array} - Flat array of zones
   */
  getAllZones() {
    const flatArray = this.root.toFlatArray();
    return flatArray.slice(1); // Remove root from the array
  }

  /**
   * Check if a zone exists
   * @param {string} name - Name to check
   * @returns {boolean} - Whether the zone exists
   */
  hasZone(name) {
    return this.root.findNode(name) !== null;
  }
}
