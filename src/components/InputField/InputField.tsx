import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { FieldValues } from "react-hook-form";
import styled from "styled-components";

type Props = { name: string; placeholder: string; type: string } & FieldValues;

const InputField: FC<Props> = ({
  name,
  setValue: setFormValue,
  placeholder,
  type,
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (!value) return;
    setFormValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [value, name, setFormValue]);

  return (
    <InputStyled
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
    />
  );
};
const InputStyled = styled.input`
  display: block;
  padding: 10px;
  margin-bottom: 20px;
  background-color: blanchedalmond;
  border: 2px solid blanchedalmond;
  border-radius: 7px;
  width: 200px;
  cursor: pointer;
`;
export default InputField;
