import React, { useState } from "react";
import "../../css/leaves.css"; // Updated CSS file name
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Leaves = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const leavesData = [
    {
      name: "Basil",
      description: "Aromatic herb used in cooking.",
      image: "/img/leaves/1.jpg",
      price: 50,
    },
    {
      name: "Mint",
      description: "Cool and refreshing herb.",
      image: "/img/leaves/2.jpg",
      price: 40,
    },
    {
      name: "Coriander",
      description: "Common in Indian dishes.",
      image: "/img/leaves/3.jpg",
      price: 30,
    },
    {
      name: "Spinach",
      description: "Leafy green full of iron.",
      image: "/img/leaves/4.jpg",
      price: 60,
    },
    {
      name: "Fenugreek",
      description: "Known as methi, with bitter notes.",
      image: "/img/leaves/5.jpg",
      price: 35,
    },
    {
      name: "Curry Leaves",
      description: "Essential for South Indian cooking.",
      image: "/img/leaves/6.jpg",
      price: 25,
    },
    {
      name: "Bay Leaf",
      description: "Used in soups and stews.",
      image: "/img/leaves/7.jpg",
      price: 20,
    },
    {
      name: "Drumstick Leaves",
      description: "Nutrient-rich green leaf.",
      image: "/img/leaves/8.jpg",
      price: 55,
    },
    {
      name: "Amaranth",
      description: "Red or green leaves, very nutritious.",
      image: "/img/leaves/9.jpg",
      price: 45,
    },
    {
      name: "Sorrel",
      description: "Tangy, lemony-flavored leaf.",
      image: "/img/leaves/10.jpg",
      price: 50,
    },
  ];

  const handleAddToCart = (item) => {
    const existingProduct = cart.find((c) => c.name === item.name);
    if (existingProduct) {
      setCart(
        cart.map((c) =>
          c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (name, op) => {
    setCart(
      cart.map((c) =>
        c.name === name
          ? {
              ...c,
              quantity:
                op === "increment"
                  ? c.quantity + 1
                  : Math.max(1, c.quantity - 1),
            }
          : c
      )
    );
  };

  const handleRemoveFromCart = (name) => {
    setCart(cart.filter((c) => c.name !== name));
  };

  const filteredLeaves = leavesData.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Cart Summary", 20, 20);

    doc.setFontSize(12);
    let y = 30;

    setTimeout(() => {
      cart.forEach((item) => {
        doc.text(
          `${item.name} (₹${item.price}) - Quantity: ${item.quantity}`,
          20,
          y
        );
        y += 10;
      });

      setTimeout(() => {
        doc.text(`Total Items: ${totalItems}`, 20, y);
        y += 10;
        doc.text(`Total Price: ₹${totalPrice}`, 20, y);
        doc.save("leaves-cart-summary.pdf");
      }, 500);
    }, 100);
  };

  return (
    <div className="leaves-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search leaves..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="leaves-container">
        {filteredLeaves.map((item) => (
          <div
            className="leaves-card"
            key={item.name}
            onClick={() => navigate(`/leaves/${item.name.toLowerCase()}`)}
          >
            <img src={item.image} alt={item.name} className="leaves-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <button
              className="add-to-cart-btn"
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

export default Leaves;
