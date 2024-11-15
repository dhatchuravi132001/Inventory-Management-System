import React, { useEffect} from 'react';
import { useInventory } from '../context/InventoryContext';
import axios from 'axios';

const ItemList = ({ setCurrentItem }) => {
  const { state, dispatch, loadItems } = useInventory();

  useEffect(() => {
    loadItems();
  }, [loadItems]);
  
  

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            <p>{item.itemName} - Quantity: {item.quantity} - Price: ${item.price}</p>
            <button onClick={() => setCurrentItem(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
