import React, { useState } from "react";
import "../../css/office.css"; // Make sure this file exists
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Office = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const officeData = [
    {
      name: "Desk Plant",
      description: "Brings freshness to your workspace.",
      image: "/img/office/1.jpg",
      price: 200,
    },
    {
      name: "Succulent Pot",
      description: "Low-maintenance and stylish.",
      image: "/img/office/2.jpg",
      price: 150,
    },
    {
      name: "Bamboo Plant",
      description: "Symbol of luck and peace.",
      image: "/img/office/3.jpg",
      price: 180,
    },
    {
      name: "Snake Plant",
      description: "Perfect for low light office corners.",
      image: "/img/office/4.jpg",
      price: 170,
    },
  ];

  const handleAddToCart = (item) => {
    const existing = cart.find((i) => i.name === item.name);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (name, type) => {
    setCart(
      cart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity:
                type === "increment"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : item.quantity,
            }
          : item
      )
    );
  };

  const handleRemoveFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const filteredOffice = officeData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Office Cart Summary", 20, 20);

    let y = 30;
    cart.forEach((item) => {
      doc.text(`${item.name} (₹${item.price}) - Qty: ${item.quantity}`, 20, y);
      y += 10;
    });

    doc.text(`Total Items: ${totalItems}`, 20, y + 10);
    doc.text(`Total Price: ₹${totalPrice}`, 20, y + 20);
    doc.save("office-cart-summary.pdf");
  };

  return (
    <div className="office-section">
      <div className="office-search-bar">
        <input
          type="text"
          placeholder="Search office plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="office-search-input"
        />
      </div>

      <div className="office-grid">
        {filteredOffice.map((item) => (
          <div
            key={item.name}
            className="office-product-card"
            onClick={() => navigate(`/office/${item.name.toLowerCase()}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="office-product-image"
              onError={(e) => {
                if (
                  e.target.src !==
                  window.location.origin + "/img/default-placeholder.png"
                ) {
                  e.target.src = "/img/default-placeholder.png";
                }
              }}
            />
            <h3 className="office-product-title">{item.name}</h3>
            <p className="office-product-description">{item.description}</p>
            <button
              className="office-cart-button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(item);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="office-cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ₹{totalPrice}</p>
        <div className="office-cart-items">
          {cart.map((item) => (
            <div key={item.name} className="office-cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="office-cart-image"
              />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <div className="office-quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.name, "decrement")}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.name, "increment")}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveFromCart(item.name)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="office-download-btn" onClick={generatePDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Office;
