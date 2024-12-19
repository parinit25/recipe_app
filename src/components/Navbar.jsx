import React from "react";
import { Icon } from "@iconify/react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <header>
      <Icon icon="game-icons:chef-toque" width="50" height="50" />
      <h1>Chef Claude</h1>
    </header>
  );
};

export default Navbar;
