import { useCallback } from "react";
import { useSelector } from "react-redux";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import {
  specialtyDataSelector,
  specialtyMetaSelector,
} from "../store/selectors/doctorSpecialty";
import { doctorsMetaSelector } from "../store/selectors/doctor";

type Props = {
  formGenders: string | undefined;
  formDoctor: string | undefined;
  setValue: UseFormSetValue<FieldValues>;
};

export const useFilteredSpecialties = ({ formGenders }: Props) => {
  const doctorSpecialty = useSelector(specialtyDataSelector);

  const { loading: specialtyLoading } = useSelector(specialtyMetaSelector);
  const { loading: doctorsLoading } = useSelector(doctorsMetaSelector);

  const filteredSpecialtiesByGender = useCallback(
    (rest) => {
      const filteredSpecialties = rest?.filter((specialty) => {
        if (
          !specialty.params ||
          specialty?.params?.maxAge ||
          specialty?.params?.minAge
        )
          return true;
        if (specialty.params.gender === formGenders) return true;
      });
      return filteredSpecialties;
    },
    [formGenders, specialtyLoading]
  );

  const output = useCallback(() => {
    if (specialtyLoading || doctorsLoading) return [];

    let result = [...doctorSpecialty];

    if (formGenders) result = filteredSpecialtiesByGender(result);

    return result;
  }, [specialtyLoading, doctorsLoading, formGenders]);
  return output;
};
