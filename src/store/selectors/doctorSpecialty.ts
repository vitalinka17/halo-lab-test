import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const specialtySelector = (state: RootState) => state.specialty;

export const specialtyDataSelector = createSelector(
  specialtySelector,
  (specialty) => specialty.data
);

export const specialtyMetaSelector = createSelector(
  specialtySelector,
  (specialty) => specialty.meta
);
