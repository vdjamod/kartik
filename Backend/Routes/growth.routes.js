// import express from "express";
// import axios from "axios";
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Send generated link from original link
router.post('/generate-link', async (req, res) => {
  const { link } = req.body;

  try {
    const response = await axios.post('https://sih-2024-two.vercel.app/growth/genlink', {
      link,
    });

    // console.log(response);

    const generatedLink = response.data.data.gen_link;
    res.json({ generatedLink }); //res.send({ generatedLink });
  } catch (error) {
    console.error('Error generating link:', error);
    res.status(500).json({ message: 'Error generating link', error: error.message });
  }
});

// Return generated link
router.post('/add/genlink', async (req, res) => {
  const { gel_link } = req.body;

  try {
    const response = await axios.post('https://sih-2024-two.vercel.app/growth/add/genlink', {
      gel_link,
    });

    console.log(response.data.msg);

    res.json({ gel_link }); //res.send({ generatedLink });
  } catch (error) {
    console.error('Error generating link:', error);
    res.status(500).json({ message: 'Error generating link', error: error.message });
  }
});



module.exports = router
