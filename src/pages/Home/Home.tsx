import React from "react";
import PatientRegister from "../../features/PatientRegister/PatientRegister";
import styled from "styled-components";

const Home = () => {
  return (
    <ContainerStyled>
      <PatientRegister />
    </ContainerStyled>
  );
};
const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  font-size: large;
`;
export default Home;
