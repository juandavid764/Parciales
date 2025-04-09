import { configureStore } from "@reduxjs/toolkit";
import clientesSlice from "./slices/ClientesSlice.jsx";

export const Store = configureStore({
  reducer: {
    estadoClientes: clientesSlice,
  },
});
