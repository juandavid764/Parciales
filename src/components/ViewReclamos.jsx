import { ReclamoCard } from "./ReclamoCard";

export const ViewReclamos = ({ reclamos }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4 h-full">
      <h1 className="text-3xl font-bold mb-4 text-black">View Reclamos</h1>
      <div className="flex flex-col w-full h-1/2 overflow-y-auto">
        {reclamos.size() ? (
          reclamos.items.map((reclamo, index) => (
            <ReclamoCard key={index} reclamo={reclamo} />
          ))
        ) : (
          <p>No reclamos</p>
        )}
      </div>
    </div>
  );
};
