const express = require('express')
const BodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000;
const { Client } = require('pg');

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(cors())

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers.authorization;
  if (!apiKey || apiKey !== 'Bearer 123ABC') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.use('/customers', authMiddleware);
app.use('/orders', authMiddleware);
app.use('/order_items', authMiddleware);

// Create a new client instance
const pool = new Client();

// Connect to the database
pool.connect()
  .then(() => console.log('Connected to the database!'))
  .catch(err => console.error('Error connecting to the database', err.stack));



app.get("/", async(req,res) =>{
  try{
    res.send("Endpoints supported: orders, customers, order_items.\n\n"+
   " Methods supported: GET,POST,PUT,DELETE")
  }
  catch(err){
    console.error(err);
    res.status(500).json({ error: err });
  }
})

// Customers endpoints

app.get('/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.post('/customers', async (req, res) => {
  const { name, email, address } = req.body;
  try {
    const result = await pool.query('INSERT INTO customers (name, email, address) VALUES ($1, $2, $3) RETURNING *', [name, email, address]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.put('/customers/:id',authMiddleware ,  async (req, res) => {
  const id = req.params.id;
  const { name, email, address } = req.body;
  try {
    const result = await pool.query('UPDATE customers SET name=$1, email=$2, address=$3 WHERE id=$4 RETURNING *', [name, email, address, id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.delete('/customers/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM customers WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// Orders endpoints
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});


app.post('/orders', async (req, res) => {
  const { customer_id, order_date, total } = req.body;
  try {
    const result = await pool.query('INSERT INTO orders (customer_id, order_date, total) VALUES ($1, $2, $3) RETURNING *', [customer_id, order_date, total]);
    res.json(result.rows[0]);
      } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.put('/orders/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const { customer_id, order_date, total } = req.body;
  try {
    const result = await pool.query('UPDATE orders SET customer_id=$1, order_date=$2, total=$3 WHERE id=$4 RETURNING *', [customer_id, order_date, total, id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.delete('/orders/:id', authMiddleware,  async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// Order items endpoints
app.get('/order_items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM order_items');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.post('/order_items', async (req, res) => {
  const { order_id, product_name, price, quantity } = req.body;
  try {
    const result = await pool.query('INSERT INTO order_items (order_id, product_name, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *', [order_id, product_name, price, quantity]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.put('/order_items/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const { order_id, product_name, price, quantity } = req.body;
  try {
    const result = await pool.query('UPDATE order_items SET order_id=$1, product_name=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *', [order_id, product_name, price, quantity, id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order item not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.delete('/order_items/:id', authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM order_items WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order item not found' });
    } else {
       res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log("Hosted on port " + PORT)
})

module.exports = app;
