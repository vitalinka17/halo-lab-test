import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  name: string;
  placeholder: string;
};
type Genders = { id: number; text: string };

const genders = [
  { id: 1, text: "Male" },
  { id: 2, text: "Female" },
];

const Select: FC<Props> = ({ name, placeholder }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Genders[]>(genders);
  const [selectedText, setSelectedText] = useState<string>(placeholder);

  const handleItemClick = (text: string) => {
    setSelectedText(text);
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
        <span>{selectedText}</span>
      </ButtonStyled>
      {open && (
        <DropDownContainerStyled>
          {selected?.map(({ text, id }) => (
            <DropDownItemStyled
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(text);
              }}
              key={id}
            >
              {text}
            </DropDownItemStyled>
          ))}
        </DropDownContainerStyled>
      )}
    </>
  );
};
const ButtonStyled = styled.button`
  width: 223px;
  display: block;
  padding: 10px;
  background-color: blanchedalmond;
  border: 2px solid blanchedalmond;
  border-radius: 7px;
  cursor: pointer;
`;
const DropDownContainerStyled = styled.div`
  background-color: blanchedalmond;
  border-radius: 7px;
  border-top: 2px solid grey;
  cursor: pointer;
`;
const DropDownItemStyled = styled.div`
  width: 100%;
  border-bottom: 2px solid grey;
  padding: 10px 0 10px 0;
  text-align: center;
`;

export default Select;
