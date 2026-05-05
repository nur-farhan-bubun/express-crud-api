const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'This is the first item' },
  { id: 2, name: 'Item 2', description: 'This is the second item' }
];

// Read all items (GET)
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Read a single item by ID (GET)
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('The item with the given ID was not found.');
  res.json(item);
});

// Create a new item (POST)
app.post('/api/items', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('Name is required');
  }

  const newItem = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    name: req.body.name,
    description: req.body.description || ''
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an existing item (PUT)
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('The item with the given ID was not found.');

  if (!req.body.name) {
    return res.status(400).send('Name is required');
  }

  item.name = req.body.name;
  item.description = req.body.description || item.description;

  res.json(item);
});

// Delete an item (DELETE)
app.delete('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('The item with the given ID was not found.');

  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem[0]);
});

app.listen(port, () => {
  console.log(`CRUD API listening at http://localhost:${port}`);
});
