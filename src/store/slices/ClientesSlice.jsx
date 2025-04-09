import { createSlice } from "@reduxjs/toolkit";

const clientesSlice = createSlice({
  name: "estadoClientes",
  initialState: {
    nombre:""
  },
  reducers: {
    changeName: (state, action) => {
      state.nombre = action.payload;
    },
  },
});

export const { append } = clientesSlice.actions;

export default clientesSlice.reducer;
