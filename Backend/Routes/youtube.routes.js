// import express from "express";
// import axios from "axios";
const express = require('express');
const axios = require('axios');
const router = express.Router();

// send generated link from user input
router.post('/video', async (req, res) => {
  const { title } = req.body;

  try {
    // Replace this URL with the actual API endpoint to fetch videos
    const response = await axios.post('https://sih-2024-5.onrender.com/youtube/video', {
      title,
    });

    const videoLinks = response.data.data.map((el) => ({
      id: el.id,
      url: `https://www.youtube.com/watch?v=${el.id}`,
    }));

    res.status(200).json({ data: videoLinks });
  } catch (error) {
    console.error('Error fetching video links:', error);
    res.status(500).json({ message: 'Error fetching video links' });
  }
});



module.exports = router