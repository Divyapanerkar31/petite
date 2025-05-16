import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import Home from "./pages/Home";
import Product from "./pages/product";
import About from "./pages/About";
import Flowers from "./pages/product/flowers";
import Fruits from "./pages/product/fruits";
import Indoor from "./pages/product/indoor";
import Office from "./pages/product/office";
import Terrace from "./pages/product/terrace";
import Ornamental from "./pages/product/ornamental";
import Vegetables from "./pages/product/vegetables"; // 
import Leaves from "./pages/product/leaves";
import Contact from "./pages/Contact";
import Outdoor from "./pages/product/outdoor";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/flowers" element={<Flowers />} />
        <Route path="/product/vegetables" element={<Vegetables />} />{" "}
      
        <Route path="/product/fruits" element={<Fruits />} />
        <Route path="/product/office" element={<Office />} />
        <Route path="/product/indoor" element={<Indoor />} />
        <Route path="/product/outdoor" element={<Outdoor />} />
        <Route path="/product/terrace" element={<Terrace />} />
        <Route path="/product/ornamental" element={<Ornamental />} />
        <Route path="/product/leaves" element={<Leaves />} />
        
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
