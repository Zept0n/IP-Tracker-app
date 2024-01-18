import 'dotenv/config';

import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle API requests
app.post('/getIpInfo', async (req, res) => {
  const ip = req.body.ip;
  const apiKey = process.env.API_KEY; // Your API key from the .env file
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;

  try {
    const apiResponse = await fetch(url);
    const apiData = await apiResponse.json();
    res.send(apiData);
  } catch (error) {
    console.error('Error fetching IP data:', error);
    res.status(500).send('An error occurred');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});