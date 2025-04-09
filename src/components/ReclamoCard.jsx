import React from 'react';


export const ReclamoCard = ({ reclamo }) => {
  console.log(reclamo);
  return (
    <div className="flex flex-col border p-4 mb-4 bg-white shadow-md rounded-lg ">
      <h3 className="text-xl font-bold text-black">{reclamo}</h3>    </div>
  );
};