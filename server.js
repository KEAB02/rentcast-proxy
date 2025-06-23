const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const RENTCAST_API_KEY = '73aa35c6cbca48c8bb8a67d684c6e500';

app.use(cors());

app.get('/api/property', async (req, res) => {
  const { address, city, state, zip } = req.query;
  const fullAddress = `${address}, ${city}, ${state} ${zip}`;

  try {
    const response = await fetch(`<https://api.rentcast.io/v1/properties?address=${encodeURIComponent(fullAddress)}`,> {
      headers: {
        'X-Api-Key': RENTCAST_API_KEY
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from RentCast' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
