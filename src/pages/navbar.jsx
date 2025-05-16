import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <img src="/logo (2).png" alt="Logo" className="top-left-logo" />
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/product">Product</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
    </header>
  );
}

export default Navbar;
