import React, { useState } from 'react';
import '../../css/terrace.css';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Terrace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const terraceData = [
    { name: 'Modern Pot', description: 'Stylish black and white plant pot.', image: '/img/terraced/1.jpg', price: 200 },
    { name: 'White Planter', description: 'Elegant white planter for your terrace.', image: '/img/terraced/2.jpg', price: 180 },
    { name: 'Wooden Crate Pot', description: 'Rustic wooden crate-style plant holder.', image: '/img/terraced/3.jpg', price: 250 },
    { name: 'Clay Planter', description: 'Classic clay pot ideal for herbs.', image: '/img/terraced/4.jpg', price: 150 },
    { name: 'Minimalist Vase', description: 'Decorative modern indoor planter.', image: '/img/terraced/5.jpg', price: 300 },
    { name: 'Hanging Planter', description: 'Perfect for balconies and terraces.', image: '/img/terraced/6.jpg', price: 220 },
    { name: 'Terrace Garden Setup', description: 'Full setup for a green space.', image: '/img/terraced/7.jpg', price: 950 },
    { name: 'Mini Plant Shelf', description: 'Organize your terrace pots with style.', image: '/img/terraced/8.jpg', price: 400 },
    { name: 'Ornamental Grass Pot', description: 'Elegant green decor for any terrace.', image: '/img/terraced/9.jpg', price: 170 },
    { name: 'White Stone Pot', description: 'Heavy duty outdoor stone pot.', image: '/img/terraced/10.jpg', price: 350 },
    { name: 'Terrace Table Decor', description: 'Complete décor for outdoor spaces.', image: '/img/terraced/11.jpg', price: 1200 },
    { name: 'Flower Stand', description: 'Multiple-tiered plant stand.', image: '/img/terraced/12.jpg', price: 600 },
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

  const filteredItems = terraceData.filter(p =>
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

    cart.forEach(item => {
      doc.text(`${item.name} (₹${item.price}) - Quantity: ${item.quantity}`, 20, y);
      y += 10;
    });

    y += 10;
    doc.text(`Total Items: ${totalItems}`, 20, y);
    y += 10;
    doc.text(`Total Price: ₹${totalPrice}`, 20, y);
    doc.save('terrace-cart-summary.pdf');
  };

  return (
    <div className="terrace-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search terrace products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="terrace-container">
        {filteredItems.map(item => (
          <div
            className="terrace-card"
            key={item.name}
            onClick={() => navigate(`/products/terrace/${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <img src={item.image} alt={item.name} className="terrace-image" />
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

export default Terrace;
