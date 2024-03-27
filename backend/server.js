const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const RAPID_API_KEY = '449639f8a9mshe5848f3ed30439dp101f5fjsn2a61a7e9f1c2'; // Replace 'YOUR_RAPIDAPI_KEY_HERE' with your actual RapidAPI key
const baseURL = 'https://streaming-availability.p.rapidapi.com';

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Axios instance with RapidAPI headers
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
  },
});

// Get countries
app.get('/api/countries', async (req, res) => {
  try {
    const response = await axiosInstance.get('/countries');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get genres
app.get('/api/genres', async (req, res) => {
  try {
    const response = await axiosInstance.get('/genres');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search by Filters
app.get('/api/movies/search', async (req, res) => {
  const { country, services, showType, genre, cursor } = req.query;
  try {
    const response = await axiosInstance.get('/search/filters', {
      params: {
        country,
        services,
        showType,
        genre,
        cursor,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching movies by filters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 20 Movies
app.get('/api/movies/list', async (req, res) => {
  const { country, services, showType, genre, cursor } = req.query;
  try {
    const response = await axiosInstance.get('/search/filters', {
      params: {
        country,
        services,
        showType,
        genre,
        cursor,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching movies by filters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search by Title
app.get('/api/movies/search/title', async (req, res) => {
  const { country, title, showType } = req.query;
  try {
    const response = await axiosInstance.get('/search/title', {
      params: {
        country,
        title,
        showType,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching movies by title:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get movie by ID
app.get('/api/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const response = await axiosInstance.get(`/get`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
