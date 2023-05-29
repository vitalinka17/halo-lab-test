import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import {
  citiesDataSelector,
  citiesMetaSelector,
} from "../store/selectors/cities";
import {
  doctorsDataSelector,
  doctorsMetaSelector,
} from "../store/selectors/doctor";
import {
  specialtyDataSelector,
  specialtyMetaSelector,
} from "../store/selectors/doctorSpecialty";
import { isOverEighteen } from "../helpers/time";

type Props = {
  formBirthday: string | undefined;
  formCity: string | undefined;
  formSpecialty: string | undefined;
  formDoctor: string | undefined;
  setValue: UseFormSetValue<FieldValues>;
};

export const useFilteredDoctor = ({
  formBirthday,
  formCity,
  formSpecialty,
  formDoctor,
  setValue,
}: Props) => {
  const cities = useSelector(citiesDataSelector);
  const doctors = useSelector(doctorsDataSelector);
  const doctorSpecialty = useSelector(specialtyDataSelector);

  const { loading: citiesLoading } = useSelector(citiesMetaSelector);
  const { loading: doctorsLoading } = useSelector(doctorsMetaSelector);
  const { loading: specialtyLoading } = useSelector(specialtyMetaSelector);

  useEffect(() => {
    if (specialtyLoading || doctorsLoading) return;

    if (formDoctor && formSpecialty) {
      const specialtyId = doctors?.find(
        ({ name, surname }) => `${name} ${surname}` === formDoctor
      )?.specialityId;

      const id = doctorSpecialty?.find(
        ({ name }) => name === formSpecialty
      )?.id;

      if (specialtyId !== id) {
        setValue("doctor_specialty", "");
        setValue("doctor", "");
      }
    }
  }, [formDoctor, formSpecialty, doctorsLoading, specialtyLoading]);

  const filteredDoctorsByCity = useCallback(
    (rest) => {
      const id = cities.find(({ name }) => name === formCity)?.id;
      return rest?.filter(({ cityId }) => cityId === id);
    },
    [formCity, citiesLoading, doctorsLoading]
  );

  const filteredDoctorsBySpecialty = useCallback(
    (rest) => {
      const id = doctorSpecialty.find(({ name }) => name === formSpecialty)?.id;

      return rest?.filter(({ specialityId }) => specialityId === id);
    },
    [formSpecialty, specialtyLoading, doctorsLoading]
  );

  const isEighteen = formBirthday && isOverEighteen(formBirthday);

  const output = useCallback(() => {
    if (citiesLoading || doctorsLoading || specialtyLoading) return [];

    if (!formBirthday && !formCity && !formSpecialty) return doctors;

    let result = [...doctors];

    if (formBirthday && isEighteen)
      result?.filter((doctor) => !doctor.isPediatrician);

    if (formBirthday && !isEighteen)
      result?.filter((doctor) => doctor.isPediatrician);

    if (formCity) result = filteredDoctorsByCity(result);

    if (formSpecialty) result = filteredDoctorsBySpecialty(result);

    return result;
  }, [
    formBirthday,
    formCity,
    citiesLoading,
    doctorsLoading,
    specialtyLoading,
    formSpecialty,
    formDoctor,
  ]);

  return output;
};
