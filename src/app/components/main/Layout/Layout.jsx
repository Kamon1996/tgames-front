import React from "react";
import { Header } from "../Header/Header";
import { NavbarMinimal } from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import "./index.scss";

export function Layout() {
  return (
    <div className="layout-wrapper">
      <NavbarMinimal />
      <div className="layout-wrapper__right layout-right">
        <Header />
        <div className="layout-right__content">{<Outlet />}</div>
      </div>
    </div>
  );
}
