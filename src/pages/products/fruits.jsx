import React, { useState } from "react";
import "../../css/fruits.css"; // Ensure this CSS file exists
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Fruits = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  
  const fruitData = [
    {
      name: "Apple",
      description: "Red or green, crisp and sweet.",
      image: "/img/fruits/1.jpg",
      price: 100,
    },
    {
      name: "Banana",
      description: "Soft and rich in potassium.",
      image: "/img/fruits/2.jpg",
      price: 40,
    },
    {
      name: "Mango",
      description: "Juicy tropical delight.",
      image: "/img/fruits/12.jpg",
      price: 120,
    },
    {
      name: "Orange",
      description: "Tangy and full of vitamin C.",
      image: "/img/fruits/5.webp",
      price: 60,
    },
    {
      name: "Grapes",
      description: "Perfectly sweet bite-sized fruits.",
      image: "/img/fruits/3.jpg",
      price: 90,
    },
    {
      name: "Pineapple",
      description: "Tropical fruit with a zesty taste.",
      image: "/img/fruits/6.jpg",
      price: 80,
    },
    {
      name: "Strawberry",
      description: "Bright red with a fresh taste.",
      image: "/img/fruits/6.jpg",
      price: 150,
    },
    {
      name: "Papaya",
      description: "Soft, sweet, and nutritious.",
      image: "/img/fruits/8.jpg",
      price: 70,
    },
    {
      name: "Watermelon",
      description: "Refreshing and hydrating.",
      image: "/img/fruits/9.jpg",
      price: 110,
    },
    {
      name: "Kiwi",
      description: "Tangy green fruit with edible seeds.",
      image: "/img/fruits/10.jpg",
      price: 130,
    },
  ];

  const handleAddToCart = (fruit) => {
    const existingProduct = cart.find((item) => item.name === fruit.name);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.name === fruit.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...fruit, quantity: 1 }]);
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

  const filteredFruits = fruitData.filter((fruit) =>
    fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="fruit-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search fruits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search fruits"
        />
      </div>

      <div className="fruit-container">
        {filteredFruits.map((fruit) => (
          <div
            className="fruit-card"
            key={fruit.name}
            onClick={() => navigate(`/fruits/${fruit.name.toLowerCase()}`)}
          >
            <img
              src={fruit.image}
              alt={fruit.name}
              className="fruit-image"
              onError={(e) => {
                if (
                  e.target.src !==
                  window.location.origin + "/img/default-placeholder.png"
                ) {
                  e.target.src = "/img/default-placeholder.png";
                }
              }}
            />
            <h3>{fruit.name}</h3>
            <p>{fruit.description}</p>
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(fruit);
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
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <div className="quantity-controls">
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
        <button className="download-pdf-btn" onClick={generatePDF}>
          Download Cart Summary (PDF)
        </button>
      </div>
    </div>
  );
};

export default Fruits;
