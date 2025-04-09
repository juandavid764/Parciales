import React, { useEffect, useState } from "react";
import { DoubleLinkedList } from "../Models/DoubleLinkedList";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState( new DoubleLinkedList());

  const [currentClient, setCurrentClient] = useState(null);
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleReload = () => {
    setReload(!reload);
  }

  // Llenar la lista con datos simulados
  useEffect(() => {
    const mockedPages = ["Juan David", "Luis Fernando", "Andres Felipe"];

    mockedPages.forEach((page) => clientes.append(page));

    setCurrentClient(clientes.head); // Establecer la primera página como la actual
  }, []);

  const handleNext = () => {
    setCurrentClient(currentClient.next);
  };

  const handlePrevious = () => {
    setCurrentClient(currentClient.prev);
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const newClientName = formData.nombre;
    clientes.append(newClientName);
    handleReload();
  };

  const handleVerDetails = () => {
    if (currentClient) {
      navigate(`/cliente/${currentClient.value}`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Clientes</h1>
      <div>
        <form className="flex flex-col items-center mb-4">
          <input
            onChange={handleChange}
            value={formData.nombre}
            name="nombre"
            type="text"
            placeholder="Nombre del cliente"
            className="border text-black border-gray-300 rounded p-2 mb-2 w-64"
          />
          <button
            onClick={handleAddClient}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Agregar Cliente
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Current Page</h2>
        <h3 className="text-blue-500 mb-4 block">
          {currentClient ? currentClient.value : "No page selected"}
        </h3>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!currentClient || !currentClient.prev}
          >
            Previous
          </button>
          <button onClick={handleVerDetails} className="bg-blue-500 text-white px-4 py-2 rounded">
            Ver
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!currentClient || !currentClient.next}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
