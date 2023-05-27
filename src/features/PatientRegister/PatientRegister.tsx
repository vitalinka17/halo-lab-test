import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../../components/InputField/InputField";
import Select from "../../components/Select/Select";

const PatientRegister = () => {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver<Yup.AnyObjectSchema>(
      Yup.object().shape({
        name: Yup.string().required(),
        birthday: Yup.date().required(),
      })
    ),
  });
  const { getValues, formState, setValue, watch } = methods;

  const values = getValues();
  useEffect(() => {
    watch((data) => console.log(data));
  }, [values]);

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
      <Select name={"genders"} placeholder={"Choose your gender"} />
    </form>
  );
};

export default PatientRegister;
