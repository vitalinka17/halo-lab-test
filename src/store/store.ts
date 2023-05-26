import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./reducers/citySlice";
import doctorSpecialtyReducer from "./reducers/doctorSpecialitySlice";
import doctorReducer from "./reducers/doctorSlice";

const store = configureStore({
  reducer: {
    cities: citiesReducer,
    specialty: doctorSpecialtyReducer,
    doctors: doctorReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
