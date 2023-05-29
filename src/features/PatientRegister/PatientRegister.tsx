import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  citiesDataSelector,
  citiesMetaSelector,
} from "../../store/selectors/cities";
import { doctorsMetaSelector } from "../../store/selectors/doctor";
import {
  specialtyDataSelector,
  specialtyMetaSelector,
} from "../../store/selectors/doctorSpecialty";
import { genders } from "../../helpers/genders";
// eslint-disable-next-line import/namespace
import { useFilteredDoctor } from "../../hooks/useFilteredDoctor";
// eslint-disable-next-line import/namespace
import { useFetchData } from "../../hooks/useFetchData";
import { useFilteredSpecialties } from "../../hooks/useFilteredSpecialties";
import { schema } from "./utils/schema";
import InputField from "../../components/InputField/InputField";
import DataDropDown from "../../components/DataDropDown/DataDropDown";
import { ButtonStyled } from "../../components/DataDropDown/DropDownStyled";

const PatientRegister = () => {
  const cities = useSelector(citiesDataSelector);
  const doctorSpecialty = useSelector(specialtyDataSelector);
  const { loading: citiesLoading } = useSelector(citiesMetaSelector);
  const { loading: doctorsLoading } = useSelector(doctorsMetaSelector);
  const { loading: specialtyLoading } = useSelector(specialtyMetaSelector);
  useFetchData();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver<Yup.AnyObjectSchema>(schema),
  });
  const {
    getValues,
    formState: { isValid, errors },
    setValue,
    watch,
    handleSubmit,
  } = methods;

  const values = getValues();

  const [formBirthday, formCity, formSpecialty, formDoctor, formGenders] =
    watch(["birthday", "cities", "doctor_specialty", "doctor", "genders"]);

  const doctors = useFilteredDoctor({
    formBirthday,
    formCity,
    formSpecialty,
    formDoctor,
    setValue,
  });

  const specialties = useFilteredSpecialties({
    formGenders,
    formDoctor,
    setValue,
  });

  useEffect(() => {
    if (!formDoctor) return;
    const specialityId = doctors()?.find(
      ({ name, surname }) => `${name} ${surname}` === formDoctor
    )?.specialityId;
    const specialtyName = specialties()?.find(
      ({ id }) => id === specialityId
    )?.name;
    const cityName = cities?.find(({ id }) => id === specialityId)?.name;
    setValue("doctor_specialty", specialtyName, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("cities", cityName, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [formDoctor]);

  const onSubmit = async (data) => {
    console.log("finalData", data);
  };

  return (
    <form>
      <InputField
        name={"name"}
        placeholder={"Name"}
        type={"text"}
        setValue={setValue}
      />
      <InputField
        name={"birthday"}
        placeholder={"Birthday"}
        type={"date"}
        setValue={setValue}
      />
      <DataDropDown
        name={"genders"}
        placeholder={"Choose your gender"}
        data={genders}
        onChange={(name, value) =>
          setValue(name, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
      />
      {citiesLoading ? (
        <div>Loading</div>
      ) : (
        <DataDropDown
          value={values?.cities}
          name={"cities"}
          placeholder={"Choose your city"}
          data={cities}
          onChange={(name, value) =>
            setValue(name, value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
      )}
      {specialtyLoading ? (
        <div>Loading</div>
      ) : (
        <DataDropDown
          value={values?.doctor_specialty}
          name={"doctor_specialty"}
          placeholder={"Choose your doctor specialty"}
          data={specialties() ?? []}
          onChange={(name, value) =>
            setValue(name, value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
      )}
      {doctorsLoading ? (
        <div>Loading</div>
      ) : (
        <DataDropDown
          name={"doctor"}
          placeholder={"Choose your doctor"}
          data={doctors() ?? []}
          onChange={(name, value) =>
            setValue(name, value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
      )}
      <InputField
        name={"email"}
        placeholder={"Enter your email"}
        type={"email"}
        setValue={setValue}
      />
      <InputField
        name={"phoneNumber"}
        placeholder={"Enter your phone number"}
        type={"tel"}
        setValue={setValue}
      />
      <ButtonStyled
        onClick={() => {
          handleSubmit(onSubmit)();
        }}
      >
        Send your form
      </ButtonStyled>
    </form>
  );
};

export default PatientRegister;
