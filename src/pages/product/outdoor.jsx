import React, { useState } from 'react';
import '../../css/outdoor.css';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Outdoor = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const outdoorData = [
    { name: 'Palm Tree', description: 'A tall, tropical tree for your garden.', image: '/img/outplants/1.jpg', price: 300 },
    { name: 'Lavender', description: 'Fragrant purple flowers perfect for outdoor settings.', image: '/img/outplants/2.webp', price: 150 },
    { name: 'Tulip', description: 'Colorful spring flowers that brighten any garden.', image: '/img/outplants/3.webp', price: 120 },
    { name: 'Rose Bush', description: 'A classic garden staple with fragrant blooms.', image: '/img/outplants/4.webp', price: 200 },
    { name: 'Cactus', description: 'Low maintenance, ideal for sunny spots.', image: '/img/outplants/5.webp', price: 100 },
    { name: 'Sunflower', description: 'Bright and cheery flowers that follow the sun.', image: '/img/outplants/6.avif', price: 90 },
    { name: 'Peony', description: 'Large blooms perfect for outplants gardens.', image: '/img/outplants/7.jpg', price: 180 },
    { name: 'Daffodil', description: 'Beautiful yellow flowers that bloom early in spring.', image: '/img/outplants/8.webp', price: 110 },
    { name: 'Marigold', description: 'Vibrant orange flowers that are easy to grow.', image: '/img/outplants/9.webp', price: 70 },
    { name: 'Geranium', description: 'Colorful flowers that thrive in sunny spots.', image: '/img/outplants/10.jpg', price: 140 },
  ];

  const handleAddToCart = (item) => {
    const existingProduct = cart.find(i => i.name === item.name);
    if (existingProduct) {
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

  const filteredItems = outdoorData.filter(p =>
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
        doc.save('outdoor-cart-summary.pdf');
      }, 500);
    }, 100);
  };

  return (
    <div className="outdoor-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search outdoor plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="outdoor-container">
        {filteredItems.map(item => (
          <div
            className="outdoor-card"
            key={item.name}
            onClick={() => navigate(`/outdoor/${item.name.toLowerCase()}`)}
          >
            <img src={item.image} alt={item.name} className="outdoor-image" />
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

export default Outdoor;
