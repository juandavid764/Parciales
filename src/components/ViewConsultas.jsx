import { ConsultaCard } from "./ConsultaCard";

export const Viewconsultas = ({ consultas }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4 h-full">
      <h1 className="text-3xl font-bold mb-4 text-black">View consultas</h1>
      <div className="flex flex-col w-full h-1/2 overflow-y-auto">
        {consultas.size() ? (
          consultas.items.map((consulta, index) => (
            <ConsultaCard key={index} consulta={consulta} />
          ))
        ) : (
          <p>No consultas</p>
        )}
      </div>
    </div>
  );
};
