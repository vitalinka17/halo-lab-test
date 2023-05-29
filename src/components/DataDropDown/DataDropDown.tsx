import React, { FC, useState } from "react";
import { Item as CitiesItem } from "../../store/reducers/citySlice";
import { Item as DoctorItem } from "../../store/reducers/doctorSlice";
import {
  ButtonStyled,
  DropDownContainerStyled,
  DropDownItemStyled,
  DoctorItemContainerStyled,
} from "./DropDownStyled";

type Item = Partial<Omit<DoctorItem, "id" | "name">> & CitiesItem;

type Props = {
  name: string;
  placeholder: string;
  value?: string | undefined;
  data: Item[] | [];
  onChange: (name: string, value: string) => void;
};

const DataDropDown: FC<Props> = ({
  name,
  placeholder,
  data,
  onChange,
  value = "",
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>(placeholder);

  const handleItemClick = (text: string) => {
    setSelectedText(text);
    onChange(name, text);
    setOpen(false);
  };

  return (
    <>
      <ButtonStyled
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        <span>{value || selectedText}</span>
      </ButtonStyled>
      {open && (
        <DropDownContainerStyled>
          {data?.map(({ name: value = "", id = "", surname = "" }) => (
            <DropDownItemStyled
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(surname ? `${value} ${surname}` : value);
              }}
              key={id}
            >
              <DoctorItemContainerStyled>
                <span>{value}</span>
                <span>{surname}</span>
              </DoctorItemContainerStyled>
            </DropDownItemStyled>
          ))}
        </DropDownContainerStyled>
      )}
    </>
  );
};

export default DataDropDown;
