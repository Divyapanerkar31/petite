import React, { useState } from "react";
import "../../css/vegetables.css";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Vegetables = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const vegetableData = [
    { name: "Carrot", description: "A root vegetable, typically orange in color.", image: "/img/v/c.jpg", price: 50 },
    { name: "Broccoli", description: "Green vegetable with a dense head of flower buds.", image: "/img/v/b.jpg", price: 60 },
    { name: "Tomato", description: "A red or yellow fruit that is typically used as a vegetable in dishes.", image: "/img/v/1.jpg", price: 40 },
    { name: "Cucumber", description: "A green, long vegetable with a mild flavor.", image: "/img/v/u.jpg", price: 30 },
    { name: "Potato", description: "A starchy tuber, typically brown or red in color.", image: "/img/v/p.jpg", price: 20 },
    { name: "Spinach", description: "A green leafy vegetable rich in iron.", image: "/img/v/9.jpg", price: 70 },
    { name: "Lettuce", description: "A leafy green vegetable often used in salads.", image: "/img/v/3.jpg", price: 40 },
    { name: "Onion", description: "A bulbous vegetable with a strong flavor and scent.", image: "/img/v/on.jpg", price: 30 },
    { name: "Peas", description: "Small green spherical seeds commonly used in cooking.", image: "/img/v/e.jpg", price: 50 },
    { name: "Bell Pepper", description: "A sweet, crunchy vegetable, available in various colors.", image: "/img/v/bp.jpg", price: 80 },
  ];

  const handleAddToCart = (vegetable) => {
    const existingProduct = cart.find((item) => item.name === vegetable.name);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.name === vegetable.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...vegetable, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (name, operation) => {
    setCart(
      cart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity:
                operation === "increment"
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

  const filteredVegetables = vegetableData.filter((vegetable) =>
    vegetable.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Cart Summary", 20, 20);

    doc.setFontSize(12);
    let yOffset = 30;

    cart.forEach((item) => {
      doc.text(
        `${item.name} (₹${item.price}) - Quantity: ${item.quantity}`,
        20,
        yOffset
      );
      yOffset += 10;
    });

    doc.text(`Total Items: ${totalItems}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Total Price: ₹${totalPrice}`, 20, yOffset);
    doc.save("cart-summary.pdf");
  };

  return (
    <div className="vegetable-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search vegetables..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="vegetable-container">
        {filteredVegetables.map((vegetable) => (
          <div
            className="vegetable-card"
            key={vegetable.name}
            onClick={() =>
              navigate(`/vegetables/${vegetable.name.toLowerCase()}`)
            }
          >
            {cart.find((item) => item.name === vegetable.name) && (
              <span className="in-cart-indicator">In Cart</span>
            )}
            <img src={vegetable.image} alt={vegetable.name} />
            <h3>{vegetable.name}</h3>
            <p>{vegetable.description}</p>
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(vegetable);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ₹{totalPrice}</p>
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.name, "decrement")}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.name, "increment")}>+</button>
                </div>
                <button onClick={() => handleRemoveFromCart(item.name)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button className="download-pdf-btn" onClick={generatePDF}>
          Download Cart Summary (PDF)
        </button>
      </div>
    </div>
  );
};

export default Vegetables;
