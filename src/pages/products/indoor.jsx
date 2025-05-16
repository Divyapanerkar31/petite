import React, { useState } from 'react';
import '../../css/indoor.css'; // Updated CSS file name
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Indoor = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const indoorData = [
    { name: 'Snake Plant', description: 'Air-purifying and low maintenance.', image: '/img/indoor/1.jpg', price: 250 },
    { name: 'Peace Lily', description: 'Elegant white blooms for peace.', image: '/img/indoor/2.jpg', price: 300 },
    { name: 'Spider Plant', description: 'Hardy plant with arching leaves.', image: '/img/indoor/3.jpg', price: 200 },
    { name: 'Aloe Vera', description: 'Soothing medicinal plant.', image: '/img/indoor/4.jpg', price: 180 },
    { name: 'Pothos', description: 'Trailing plant for hanging pots.', image: '/img/indoor/5.jpg', price: 220 },
    { name: 'ZZ Plant', description: 'Glossy leaves and thrives in low light.', image: '/img/indoor/6.jpg', price: 270 },
    { name: 'Rubber Plant', description: 'Thick leaves and striking appearance.', image: '/img/indoor/7.jpg', price: 350 },
    { name: 'Areca Palm', description: 'Tropical feel, great for corners.', image: '/img/indoor/8.jpg', price: 400 },
    { name: 'Philodendron', description: 'Heart-shaped leaves, very adaptable.', image: '/img/indoor/9.jpg', price: 240 },
    { name: 'Money Plant', description: 'Symbol of good luck and fortune.', image: '/img/indoor/10.jpg', price: 160 },
  ];

  const handleAddToCart = (item) => {
    const existingProduct = cart.find(c => c.name === item.name);
    if (existingProduct) {
      setCart(cart.map(c =>
        c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (name, op) => {
    setCart(cart.map(c =>
      c.name === name
        ? { ...c, quantity: op === 'increment' ? c.quantity + 1 : Math.max(1, c.quantity - 1) }
        : c
    ));
  };

  const handleRemoveFromCart = (name) => {
    setCart(cart.filter(c => c.name !== name));
  };

  const filteredIndoor = indoorData.filter(p =>
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
        doc.save('indoor-cart-summary.pdf');
      }, 500);
    }, 100);
  };

  return (
    <div className="indoor-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search indoor plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="indoor-container">
        {filteredIndoor.map((item) => (
          <div
            className="indoor-card"
            key={item.name}
            onClick={() => navigate(`/indoor/${item.name.toLowerCase()}`)}
          >
            <img src={item.image} alt={item.name} className="indoor-image" />
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

export default Indoor;
