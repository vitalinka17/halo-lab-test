import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home/Home";

export enum Pages {
  HOME = "/home",
  DEFAULT = "/",
}

const Navigation = () => {
  return (
    <Routes>
      <Route element={<Home />} path={Pages.HOME}></Route>
      <Route
        element={<Navigate to={Pages.HOME} />}
        path={Pages.DEFAULT}
      ></Route>
      <Route element={<div>Not Found</div>} path={"*"}></Route>
    </Routes>
  );
};

export default Navigation;
