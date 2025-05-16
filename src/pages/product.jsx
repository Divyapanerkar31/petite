import React from "react";
import "../css/product.css";
import { useNavigate } from "react-router-dom";

const products = [
  {
    img: "/img/Flowers/f1.jpg",
    title: "Flowers",
    description: "Beautiful fresh flowers for every occasion.",
    link: "/product/flowers", 

  },
 
  {
    img: "/img/fruits/u1.jpg",
    title: "Fruits",
    description: "Juicy, fresh fruits picked daily for your health.",
    link: "/product/fruits",
  },
  
  {
    img: "/img/terraced/1.jpg",
    title: "Terrace Decoration",
    description: "Breathe life into your terrace with green decor.",
    link: "/product/terrace",
  },
  {
    img: "/img/indoor/1.jpg",
    title: "Indoor Decoration",
    description: "Stylish indoor arrangements for a cozy feel.",
    link: "/product/indoor",
  },
  {
    img: "/img/office/1.jpg",
    title: "Office Decoration",
    description: "Bring calm and creativity into your workspace.",
    link: "/product/office",
  },
  {
    img: "/img/outplants/1.jpg",
    title: "Outdoor Plants",
    description: "Hardy plants perfect for balconies and gardens.",
    link: "/product/outdoor",
  },
  {
    img: "/img/ornamental/1.jpg",
    title: "Ornamental Decoration",
    description: "Artistic plants and pots to wow your guests.",
    link: "/product/ornamental",
  },
  {
    img: "/img/leaves/1.jpg",
    title: "Leaves Decoration",
    description: "Green leafy designs for a refreshing vibe.",
    link: "/product/leaves",
  },
];

const Product = () => {
  const navigate = useNavigate(); 

  const handleCardClick = (link) => {
    navigate(link);
  };


  return (
    <div>
      <img src="/logo (2).png" alt="Logo" className="top-left-logo" />

      <h1>All Products</h1>
      <div className="product-container">
        {products.map((product, index) => (
          <div
            key={index}
            className="product-card"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleCardClick(product.link)}
          >
            <img src={product.img} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
