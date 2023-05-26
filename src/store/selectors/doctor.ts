import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const doctorsSelector = (state: RootState) => state.doctors;

export const doctorsDataSelector = createSelector(
  doctorsSelector,
  (doctors) => doctors.data
);

export const doctorsMetaSelector = createSelector(
  doctorsSelector,
  (doctors) => doctors.meta
);
