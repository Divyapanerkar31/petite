import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar";
import Home from "./pages/Home";
import Product from "./pages/product";
import About from "./pages/About";
import Flowers from './pages/products/flowers'
import Fruits from "./pages/products/fruits";
import Indoor from "./pages/products/indoor";
import Office from "./pages/products/office";
import Terrace from "./pages/products/terrace";
import Ornamental from "./pages/products/ornamental";
import Vegetables from "./pages/products/vegetables"; 
import Leaves from "./pages/products/leaves";
import Contact from "./pages/Contact";
import Outdoor from "./pages/products/outdoor";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/flowers" element={<Flowers />} />
        <Route path="/product/vegetables" element={<Vegetables />} />
      
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
