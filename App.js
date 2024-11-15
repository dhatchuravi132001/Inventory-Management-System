import './App.css';

import React, { useState } from 'react';
import { InventoryProvider } from './context/InventoryContext';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <InventoryProvider>
      <div>
        <h1>Inventory Management</h1>
        <ItemForm currentItem={currentItem} setCurrentItem={setCurrentItem} />
        <ItemList setCurrentItem={setCurrentItem} />
      </div>
    </InventoryProvider>
  );
}

export default App;
