import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ onOrderPlaced }) => {
  const [formData, setFormData] = useState({ type: 'buyer', price: '', qty: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5455/add${formData.type}`, formData)
      .then(response => {
        console.log('Order placed:', response.data);
        setFormData({ type: 'buyer', price: '', qty: '' }); // Reset form
        axios.post('http://localhost:5455/evaluate').then(() => {
            onOrderPlaced(); // Ensure the refresh is triggered again after evaluation
          });
      })
      .catch(error => console.error('Error placing order:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input type="number" name="qty" value={formData.qty} onChange={handleChange} required />
        </label>
      </div>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
