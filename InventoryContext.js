import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Create the context
const InventoryContext = createContext();

// Reducer function to handle actions
const inventoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
};

// Provider component
export const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  const loadItems = async () => {
    const response = await axios.get('http://localhost:5000/items');
    dispatch({ type: 'SET_ITEMS', payload: response.data });
  };

  return (
    <InventoryContext.Provider value={{ state, dispatch, loadItems }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook to use inventory context
export const useInventory = () => useContext(InventoryContext);
