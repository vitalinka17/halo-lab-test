import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Item = {
  id: string;
  name: string;
  surname: string;
  specialityId: string;
  isPediatrician: boolean;
  cityId: string;
};

type InitialState = {
  meta: { loading: boolean; loaded: boolean; error: null | string };
  data: Array<Item>;
};

const initialState: InitialState = {
  meta: { loading: false, loaded: false, error: null },
  data: [],
};

export const getDoctors = createAsyncThunk("doctors/getDoctors", async () => {
  const data = await fetch(
    "https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((data) => data.json());
  return data;
});
export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDoctors.pending, (state) => {
      state.meta.loading = true;
    });
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.data = action.payload;
      state.meta.loading = false;
    });
  },
});

export default doctorsSlice.reducer;
