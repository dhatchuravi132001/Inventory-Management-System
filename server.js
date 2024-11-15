const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Import database connection

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Create an item
app.post('/items', (req, res) => {
  const { itemName, quantity, price, description, category } = req.body;
  const query = 'INSERT INTO items (itemName, quantity, price, description, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [itemName, quantity, price, description, category], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Item added', itemId: result.insertId });
  });
});

// Get all items
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
  const query = 'SELECT * FROM items WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
  const { itemName, quantity, price, description, category } = req.body;
  const query = 'UPDATE items SET itemName = ?, quantity = ?, price = ?, description = ?, category = ? WHERE id = ?';
  db.query(query, [itemName, quantity, price, description, category, req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Item updated' });
  });
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
  const query = 'DELETE FROM items WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Item deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port 5000`);
});
