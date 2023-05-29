import styled from "styled-components";

export const ButtonStyled = styled.button`
  width: 223px;
  display: block;
  padding: 10px;
  background-color: blanchedalmond;
  border: 2px solid blanchedalmond;
  border-radius: 7px;
  cursor: pointer;
  margin-bottom: 12px;
`;
export const DropDownContainerStyled = styled.div`
  background-color: blanchedalmond;
  border-radius: 7px;
  border-top: 2px solid grey;
  cursor: pointer;
  max-height: 300px;
  overflow: scroll;
`;
export const DropDownItemStyled = styled.div`
  width: 100%;
  border-bottom: 2px solid grey;
  padding: 10px 0 10px 0;
  text-align: center;
`;

export const DoctorItemContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;
