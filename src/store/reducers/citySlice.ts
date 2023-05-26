import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Item = {
  id: string;
  name: string;
};

type InitialState = {
  meta: { loading: boolean; loaded: boolean; error: null | string };
  data: Array<Item>;
};

const initialState: InitialState = {
  meta: { loading: false, loaded: false, error: null },
  data: [],
};

export const getCities = createAsyncThunk("cities/getCities", async () => {
  const data = await fetch(
    "https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((data) => data.json());
  return data;
});
export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCities.pending, (state) => {
      state.meta.loading = true;
    });
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.data = action.payload;
      state.meta.loading = false;
    });
  },
});

export default citiesSlice.reducer;
