import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const citiesSelector = (state: RootState) => state.cities;

export const citiesDataSelector = createSelector(
  citiesSelector,
  (cities) => cities.data
);

export const citiesMetaSelector = createSelector(
  citiesSelector,
  (cities) => cities.meta
);
