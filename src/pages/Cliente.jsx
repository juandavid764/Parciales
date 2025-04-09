import { useParams } from "react-router-dom";
import { useState } from "react";

import { Stack } from "../Models/Stack.js";
import { Queue } from "../Models/Queue.js";

import { ViewReclamos } from "../components/ViewReclamos.jsx";
import { Viewconsultas } from "../components/ViewConsultas.jsx";

export const Cliente = () => {
  const { nombre } = useParams();

  const [reclamos, setReclamos] = useState(new Stack());
  const [consultas, setConsultas] = useState(new Queue());
  const [reLoad, setReLoad] = useState(false);

  const [formDataConsulta, setFormDataConsulta] = useState({
    descripcion: "",
  });

  const [formDataReclamo, setFormDataReclamo] = useState({
    descripcion: "",
  });

  const handleAddReclamo = (e) => {
    e.preventDefault();
    reclamos.push(formDataReclamo.descripcion);
    setReLoad((prev) => !prev);
  };

  const handleAddConsulta = (e) => {
    e.preventDefault();
    consultas.enqueue(formDataConsulta.descripcion);
    setReLoad((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-lg text-black">Bienvenido al cliente {nombre}</h2>

      <div className="flex flex-col items-center mt-4">
        <form className="flex flex-col mb-4">
          <label className="text-lg mb-2 text-black">Consulta:</label>
          <input
            type="text"
            value={formDataConsulta.descripcion}
            onChange={(e) =>
              setFormDataConsulta({
                ...formDataConsulta,
                descripcion: e.target.value,
              })
            }
            className="border text-black border-gray-300 rounded p-2 mb-4 w-64"
          />
          <button
            onClick={handleAddConsulta}
            type="submit"
            className="bg-blue-500 text-white rounded p-2"
          >
            Enviar Consulta
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center mt-4">
        <form className="flex flex-col mb-4">
          <label className="text-lg mb-2 text-black">Reclamo:</label>
          <input
            type="text"
            value={formDataReclamo.descripcion}
            onChange={(e) =>
              setFormDataReclamo({
                ...formDataReclamo,
                descripcion: e.target.value,
              })
            }
            className="border text-black border-gray-300 rounded p-2 mb-4 w-64"
          />
          <button
            onClick={handleAddReclamo}
            type="button"
            className="bg-blue-500 text-white rounded p-2"
          >
            Enviar Reclamo
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center mt-4">
        <h2>Reclamos</h2>
        <ViewReclamos reclamos={reclamos} />
      </div>
      <div className="flex flex-col items-center mt-4">
        <h2>Consultas</h2>
        <Viewconsultas consultas={consultas} />
      </div>
    </div>
  );
};
