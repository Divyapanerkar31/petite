import React, { useState } from 'react';
import '../../css/ornamental.css';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Ornamental = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const ornamentalData = [
    { name: 'Aloe Vera', description: 'Succulent with healing properties.', image: '/img/ornamental/1.jpg', price: 120 },
    { name: 'Croton', description: 'Bright colorful leaves.', image: '/img/ornamental/2.jpg', price: 180 },
    { name: 'Areca Palm', description: 'Indoor palm with feathery leaves.', image: '/img/ornamental/3.jpg', price: 250 },
    { name: 'Dracaena', description: 'Attractive striped leaves.', image: '/img/ornamental/4.jpg', price: 220 },
    { name: 'Rubber Plant', description: 'Glossy large green leaves.', image: '/img/ornamental/5.jpg', price: 210 },
    { name: 'Ficus', description: 'Elegant indoor tree.', image: '/img/ornamental/6.jpg', price: 230 },
    { name: 'Pothos', description: 'Trailing vine, easy to grow.', image: '/img/ornamental/7.jpg', price: 90 },
    { name: 'Spider Plant', description: 'Great for hanging baskets.', image: '/img/ornamental/8.jpg', price: 110 },
    { name: 'Dieffenbachia', description: 'Striking foliage pattern.', image: '/img/ornamental/9.jpg', price: 170 },
    { name: 'Calathea', description: 'Ornate leaf designs.', image: '/img/ornamental/10.jpg', price: 200 },
  ];

  const handleAddToCart = (item) => {
    const existing = cart.find(i => i.name === item.name);
    if (existing) {
      setCart(cart.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (name, type) => {
    setCart(cart.map(i =>
      i.name === name
        ? { ...i, quantity: type === 'increment' ? i.quantity + 1 : Math.max(1, i.quantity - 1) }
        : i
    ));
  };

  const handleRemove = (name) => {
    setCart(cart.filter(i => i.name !== name));
  };

  const filteredItems = ornamentalData.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Cart Summary', 20, 20);

    doc.setFontSize(12);
    let y = 30;

    setTimeout(() => {
      cart.forEach(item => {
        doc.text(`${item.name} (₹${item.price}) - Quantity: ${item.quantity}`, 20, y);
        y += 10;
      });

      setTimeout(() => {
        doc.text(`Total Items: ${totalItems}`, 20, y);
        y += 10;
        doc.text(`Total Price: ₹${totalPrice}`, 20, y);
        doc.save('ornamental-cart-summary.pdf');
      }, 500);
    }, 100);
  };

  return (
    <div className="ornamental-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search ornamental plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="ornamental-container">
        {filteredItems.map(item => (
          <div
            className="ornamental-card"
            key={item.name}
            onClick={() => navigate(`/ornamental/${item.name.toLowerCase()}`)}
          >
            <img src={item.image} alt={item.name} className="ornamental-image" />
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
          {cart.map(item => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.name, 'decrement')}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.name, 'increment')}>+</button>
                </div>
                <button onClick={() => handleRemove(item.name)}>Remove</button>
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

export default Ornamental;
