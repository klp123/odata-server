'use strict';

const express = require('express');
const app = express();

const PORT = 4000;

// Mock data (simulating SAP data)
const products = [
  { id: 1, name: "Wireless Headphones", price: 2499 },
  { id: 2, name: "Running Sneakers", price: 3299 },
  { id: 3, name: "Smart Watch", price: 7999 },
  { id: 4, name: "Cotton T-Shirt", price: 499 },
  { id: 5, name: "Yoga Mat", price: 1199 },
  { id: 6, name: "Stainless Steel Bottle", price: 699 },
  { id: 7, name: "Mechanical Keyboard", price: 4599 },
  { id: 8, name: "Backpack (30L)", price: 1899 }
];

/**
 * GET /odata/Products
 * Supports:
 *  - $filter=price gt <value>
 *  - $top=<limit>
 */
app.get('/odata/Products', (req, res) => {
  let result = [...products];

  const filter = req.query.$filter;
  const top = req.query.$top;

  // Handle $filter (basic implementation)
  if (filter) {
    // Example: price gt 100
    if (filter.includes('price gt')) {
      const value = parseInt(filter.split('gt')[1].trim(), 10);
      result = result.filter(p => p.price > value);
    }
  }

  // Handle $top (limit)
  if (top) {
    const limit = parseInt(top, 10);
    result = result.slice(0, limit);
  }

  // OData format response
  res.json({
    value: result
  });
});

/**
 * Optional: Metadata endpoint (just for completeness)
 */
app.get('/odata/$metadata', (req, res) => {
  res.send(`
    <metadata>
      <entity name="Products">
        <property name="id" type="number" />
        <property name="name" type="string" />
        <property name="price" type="number" />
      </entity>
    </metadata>
  `);
});

app.listen(PORT, () => {
  console.log(`Mock OData server running at http://localhost:${PORT}`);
});
