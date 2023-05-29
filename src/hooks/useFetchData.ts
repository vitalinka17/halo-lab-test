import { useEffect } from "react";
import { getCities } from "../store/reducers/citySlice";
import { getDoctorSpecialty } from "../store/reducers/doctorSpecialitySlice";
import { getDoctors } from "../store/reducers/doctorSlice";
import { useAppDispatch } from "./storeHook";

export const useFetchData = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCities());
    dispatch(getDoctorSpecialty());
    dispatch(getDoctors());
  }, [dispatch]);
};
