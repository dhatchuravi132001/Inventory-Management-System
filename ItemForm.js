import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import axios from 'axios';

const ItemForm = ({ currentItem, setCurrentItem }) => {
  const { dispatch } = useInventory();
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    price: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    if (currentItem) {
      setFormData(currentItem);
    }
  }, [currentItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.itemName || !formData.quantity || !formData.price) {
      alert('Please fill all required fields');
      return;
    }

    if (currentItem) {
      // Update existing item
      const response = await axios.put(`http://localhost:5000/items/${currentItem.id}`, formData);
      dispatch({ type: 'UPDATE_ITEM', payload: response.data });
      setCurrentItem(null);
    } else {
      // Add new item
      const response = await axios.post('http://localhost:5000/items', formData);
      dispatch({ type: 'ADD_ITEM', payload: response.data });
    }

    setFormData({
      itemName: '',
      quantity: '',
      price: '',
      description: '',
      category: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="itemName"
        value={formData.itemName}
        onChange={handleChange}
        placeholder="Item Name"
        required
      />
      <input
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <button type="submit">{currentItem ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
};

export default ItemForm;
