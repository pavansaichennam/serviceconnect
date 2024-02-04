// app.js (or your backend entry file)

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;
const bcrypt = require('bcrypt');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ProjectAPMP@21',
  database: 'serviceconnectdb', // Change to your database name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Example API endpoint to fetch users
app.get('/api/users', (req, res) => {
  // Fetch data from MySQL databaseNo 
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
    } else {
      res.json(results);
    }
  });
});

// API endpoint to handle user signup
app.post('/api/signup', (req, res) => {
  // Extract user data from the request body
  const userData = req.body;

  db.query('INSERT INTO users SET ?', userData, (err, results) => {
    if (err) {
      console.error('Error signing up user:', err);
      res.status(500).json({ error: 'Error signing up user' });
    } else {
      res.status(201).json({ message: 'User Sign up successful'});
    }
  });
});

// API end point to handle login authentication
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      // Authentication successful
      const user = results[0];
      console.log('User details:', user);
      return res.json({ success: true, message: 'Login successful', user });
    } else {
      // Authentication failed
      return res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Get user by ID
app.get('/api/userbyid/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  console.log(user, userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update user by ID
app.put('/api/userupdate/:id', (req, res) => {
  const { id } = req.params; // Or use parseInt(req.params.id) if your IDs are numeric
  const updatedUser = req.body;
  console.log(updatedUser, id);

  // Assuming `users` table columns match the keys in updatedUser object
  // and your table's primary key is `id`
  let setClause = Object.keys(updatedUser).map(key => `${key} = ?`).join(', ');
  let values = Object.values(updatedUser);

  // Ensure the ID is the last value for the WHERE clause
  values.push(id);

  const query = `UPDATE users SET ${setClause} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (result.affectedRows > 0) {
      // Update was successful
      res.json({ success: true, message: 'User updated successfully' });
    } else {
      // No rows were affected, meaning the user wasn't found
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });
});

app.get('/api/services', (req, res) => {
  // Fetch data from MySQL database
  db.query('SELECT * FROM services', (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      res.status(500).json({ error: 'Error fetching services' });
    } else {
      res.json(results);
    }
  });
});

//Fetch all the Service Types from the table
app.get('/api/servicetypes', (req, res) => {
  console.log('API starting')
  db.query('SELECT Service_Type_ID, Service_Type, Service_Id FROM servicetypes', (err, results) => {
    if (err) {
      console.error('Error fetching all service types:', err);
      return res.status(500).json({ error: 'Error fetching all service types' });
    }
    res.json(results);
  });
});



// Fetch service types based on service ID
app.get('/api/servicetypes/:serviceId', (req, res) => {
  const serviceId = req.params.serviceId;
  db.query('SELECT * FROM servicetypes WHERE Service_Id = ?', [serviceId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new service record to servicecatalog
app.post('/api/servicecatalog', (req, res) => {
  const { Service_Id, Service_Type_ID, Service_Provider_ID, Price, Description } = req.body;
  const query = 'INSERT INTO ServiceCatalog (Service_Id, Service_Type_ID, Service_Provider_ID, Price, Description) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [Service_Id, Service_Type_ID, Service_Provider_ID, Price, Description], (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: 'Service added successfully', id: result.insertId });
  });
});

// This API endpoint fetches all services related to a specific service provider
app.get('/api/servicecatalog/user/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Fetching services for user ID:", id); // Debug log
  const query = `
    SELECT sc.ServiceCatalog_Id, s.Service_Id, s.Service_Name, st.Service_Type, sc.Price, sc.Description
    FROM ServiceCatalog sc
    JOIN services s ON sc.Service_Id = s.Service_Id
    JOIN servicetypes st ON sc.Service_Type_ID = st.Service_Type_ID
    WHERE sc.Service_Provider_ID = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching services for user:', err);
      return res.status(500).json({ error: 'Error fetching services' });
    }
    console.log("Services fetched successfully"); // Success debug log
    res.json(results);
  });
});


//Fetch Service details from the ServiceCatalog table from ServiceCatalog_Id 
app.get('/api/servicecatalog/:ServiceCatalog_Id', async (req, res) => {
  const { ServiceCatalog_Id } = req.params;

  const query = `
    SELECT sc.ServiceCatalog_Id, s.Service_id, s.Service_Name, st.Service_Type_ID, st.Service_Type, sc.Price, sc.Description
    FROM ServiceCatalog sc
    LEFT JOIN services s ON sc.Service_Id = s.Service_Id
    LEFT JOIN servicetypes st ON sc.Service_Type_ID = st.Service_Type_ID
    WHERE sc.ServiceCatalog_Id = ?`;

  db.query(query, [ServiceCatalog_Id], (err, results) => {
    if (err) {
      console.error('Error fetching service details:', err);
      return res.status(500).json({ success: false, message: 'Error fetching service details' });
    }

    if (results.length > 0) {
      res.json({ success: true, data: results[0] });
    } else {
      res.status(404).json({ success: false, message: 'Service not found' });
    }
  });
});

// Update the ServiceCatalog record 
app.put('/api/updateservicecatalog/:ServiceCatalog_Id', async (req, res) => {
  const { ServiceCatalog_Id } = req.params;
  const { Service_Type_ID, Price } = req.body;

  // Construct the SQL query to update the service catalog entry
  const query = `
    UPDATE ServiceCatalog
    SET Service_Type_ID = ?, Price = ?
    WHERE ServiceCatalog_Id = ?
  `;

  // Execute the SQL query
  db.query(query, [Service_Type_ID, Price, ServiceCatalog_Id], (err, result) => {
    if (err) {
      // Handle any errors during the query
      console.error('Error updating service catalog:', err);
      return res.status(500).json({ success: false, message: 'Error updating service catalog' });
    }
    
    if (result.affectedRows > 0) {
      // If the update was successful
      res.json({ success: true, message: 'Service catalog updated successfully' });
    } else {
      // If the update did not affect any rows, it means the ServiceCatalog_Id doesn't exist
      res.status(404).json({ success: false, message: 'Service catalog not found' });
    }
  });
});

// Endpoint to delete a service catalog entry by ServiceCatalog_Id
app.delete('/api/deleteservicecatalog/:ServiceCatalog_Id', async (req, res) => {
  const { ServiceCatalog_Id } = req.params;

  // Construct the SQL query to delete the service catalog entry
  const query = `
    DELETE FROM ServiceCatalog
    WHERE ServiceCatalog_Id = ?
  `;

  // Execute the SQL query
  db.query(query, [ServiceCatalog_Id], (err, result) => {
    if (err) {
      // Handle any errors during the query
      console.error('Error deleting service catalog entry:', err);
      return res.status(500).json({ success: false, message: 'Error deleting service catalog entry' });
    }
    
    if (result.affectedRows > 0) {
      // If the deletion was successful
      res.json({ success: true, message: 'Service catalog entry deleted successfully' });
    } else {
      // If the deletion did not affect any rows, it means the ServiceCatalog_Id doesn't exist
      res.status(404).json({ success: false, message: 'Service catalog entry not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
