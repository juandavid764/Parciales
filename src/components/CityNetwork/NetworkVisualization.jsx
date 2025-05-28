import React, { useEffect, useRef, useState } from 'react';

/**
 * NetworkVisualization - Visualización interactiva de la red de ciudades
 * 
 * Renderiza un grafo interactivo usando Canvas HTML5 que muestra las ciudades
 * como nodos y sus conexiones como aristas. Permite arrastrar nodos,
 * hacer hover y seleccionar ciudades clickeando.
 * 
 * @param {Object} networkData - Datos del grafo con nodos y aristas
 * @param {Function} onCitySelected - Callback cuando se selecciona una ciudad
 * @param {string} selectedCity - Ciudad actualmente seleccionada
 */
export const NetworkVisualization = ({ networkData, onCitySelected, selectedCity }) => {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);
  const [nodePositions, setNodePositions] = useState({});

  // Initialize node positions
  useEffect(() => {
    if (networkData.nodes.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;

    const newPositions = {};
    networkData.nodes.forEach((node, index) => {
      if (!nodePositions[node.id]) {
        const angle = (2 * Math.PI * index) / networkData.nodes.length;
        newPositions[node.id] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        };
      } else {
        newPositions[node.id] = nodePositions[node.id];
      }
    });

    setNodePositions(newPositions);
  }, [networkData.nodes]);

  // Drawing function
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    networkData.edges.forEach(edge => {
      const fromPos = nodePositions[edge.from];
      const toPos = nodePositions[edge.to];
      
      if (fromPos && toPos) {
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(toPos.x, toPos.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    networkData.nodes.forEach(node => {
      const pos = nodePositions[node.id];
      if (!pos) return;

      const isSelected = selectedCity === node.id;
      const isHovered = hoveredNode === node.id;
      const nodeRadius = 18;

      // Node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected
        ? '#2563eb' // blue-600
        : isHovered
        ? '#dbeafe' // blue-100
        : '#f3f4f6'; // gray-100
      ctx.fill();

      // Node border
      ctx.strokeStyle = isSelected ? '#1e40af' : '#cbd5e1'; // blue-800 or gray-300
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.stroke();

      // Node label
      ctx.fillStyle = isSelected ? '#fff' : '#334155'; // white or slate-700
      ctx.font = '12px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let displayName = node.label;
      if (displayName.length > 10) {
        displayName = displayName.substring(0, 10) + '…';
      }
      ctx.fillText(displayName, pos.x, pos.y);
    });
  }, [networkData, nodePositions, selectedCity, hoveredNode]);

  const getNodeAtPosition = (x, y) => {
    const nodeRadius = 25;
    for (const node of networkData.nodes) {
      const pos = nodePositions[node.id];
      if (pos) {
        const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
        if (distance <= nodeRadius) {
          return node;
        }
      }
    }
    return null;
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging && draggedNode) {
      setNodePositions(prev => ({
        ...prev,
        [draggedNode.id]: { x, y }
      }));
    } else {
      const node = getNodeAtPosition(x, y);
      setHoveredNode(node ? node.id : null);
      canvas.style.cursor = node ? 'pointer' : 'default';
    }
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const node = getNodeAtPosition(x, y);
    if (node) {
      setIsDragging(true);
      setDraggedNode(node);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  const handleClick = (e) => {
    if (isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const node = getNodeAtPosition(x, y);
    if (node && onCitySelected) {
      onCitySelected(node.id);
    }
  };

  const resetLayout = () => {
    setNodePositions({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Ciudades</h2>

      </div>

      {networkData.nodes.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-4">🏙️</div>
          <p>No hay ciudades en la red</p>
          <p className="text-sm">Agrega ciudades para ver la visualización</p>
        </div>
      ) : (
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="border border-gray-200 rounded-lg w-full"
            style={{ maxWidth: '100%', height: 'auto' }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            onMouseLeave={() => {
              setHoveredNode(null);
              setIsDragging(false);
              setDraggedNode(null);
            }}
          />
          
        </div>
      )}
    </div>
  );
};
