import React, { useState } from 'react';
import '../../css/flowers.css';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Flowers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const flowerData = [
    { name: 'Rose', description: 'A beautiful red flower symbolizing love.', image: '/img/Flowers/f1.jpg', price: 100 },
    { name: 'Sunflower', description: 'Bright yellow flower that follows the sun.', image: '/img/Flowers/f2.jpg', price: 120 },
    { name: 'Tulip', description: 'A spring-blooming flower with vibrant colors.', image: '/img/Flowers/f3.jpg', price: 150 },
    { name: 'Daisy', description: 'Simple and elegant with a yellow center.', image: '/img/Flowers/f4.jpg', price: 80 },
    { name: 'Lily', description: 'Known for its fragrance and large petals.', image: '/img/Flowers/f5.jpg', price: 200 },
    { name: 'Orchid', description: 'Exotic and delicate, a symbol of luxury.', image: '/img/Flowers/f6.jpg', price: 250 },
    { name: 'Lavender', description: 'Soothing purple flower with calming scent.', image: '/img/Flowers/f7.jpg', price: 90 },
    { name: 'Marigold', description: 'Bright orange and yellow, symbolizes cheer.', image: '/img/Flowers/f8.jpg', price: 70 },
    { name: 'Peony', description: 'Full blooms often used in weddings.', image: '/img/Flowers/f9.jpg', price: 180 },
    { name: 'Chrysanthemum', description: 'Rich in color, often seen in fall.', image: '/img/Flowers/f10.jpg', price: 110 },
  ];

  const handleAddToCart = (flower) => {
    const existingProduct = cart.find(item => item.name === flower.name);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.name === flower.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...flower, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (name, operation) => {
    setCart(cart.map(item =>
      item.name === name
        ? {
            ...item,
            quantity: operation === 'increment'
              ? item.quantity + 1
              : item.quantity > 1
              ? item.quantity - 1
              : item.quantity
          }
        : item
    ));
  };

  const handleRemoveFromCart = (name) => {
    setCart(cart.filter(item => item.name !== name));
  };

  const filteredFlowers = flowerData.filter(flower =>
    flower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

 
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Cart Summary', 20, 20);
    
    doc.setFontSize(12);
    let yOffset = 30;
    
  
    setTimeout(() => {
      cart.forEach((item, index) => {
        doc.text(`${item.name} (₹${item.price}) - Quantity: ${item.quantity}`, 20, yOffset);
        yOffset += 10;
      });
      
      setTimeout(() => {
        doc.text(`Total Items: ${totalItems}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Total Price: ₹${totalPrice}`, 20, yOffset);

       
        doc.save('cart-summary.pdf');
      }, 500); 

    }, 100);

  };

  return (
    <div className="flower-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search flowers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flower-container">
        {filteredFlowers.map((flower, index) => (
          <div
            className="flower-card"
            key={flower.name}
            onClick={() => navigate(`/flowers/${flower.name.toLowerCase()}`)}
          >
            <img src={flower.image} alt={flower.name} className="flower-image" />
            <h3>{flower.name}</h3>
            <p>{flower.description}</p>
            <button
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(flower);
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

export default Flowers;
