import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Params = { gender?: "Male" | "Female"; maxAge?: number; minAge?: number };

type Item = {
  id: string;
  name: string;
  params?: Params;
};

type InitialState = {
  meta: { loading: boolean; loaded: boolean; error: null | string };
  data: Array<Item>;
};

const initialState: InitialState = {
  meta: { loading: false, loaded: false, error: null },
  data: [],
};

export const getDoctorSpecialty = createAsyncThunk(
  "specialty/getSpecialty",
  async () => {
    const data = await fetch(
      "https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    ).then((data) => data.json());
    return data;
  }
);
export const doctorSpecialtySlice = createSlice({
  name: "doctorSpecialty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDoctorSpecialty.pending, (state) => {
      state.meta.loading = true;
    });
    builder.addCase(getDoctorSpecialty.fulfilled, (state, action) => {
      state.data = action.payload;
      state.meta.loading = false;
    });
  },
});

export default doctorSpecialtySlice.reducer;
