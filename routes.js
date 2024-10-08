const express = require('express');
const router = express.Router();
const axios = require('axios');

const { summarizeDocument } = require('./utilities')

router.get('/search', async (req, res) => {
  const { query, start = 0, end = 20, nFrag = 5, lFrag = 100 } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const searchUrl = `http://www.bclaws.ca/civix/search/complete/fullsearch?q=${query}&s=${start}&e=${end}&nFrag=${nFrag}&lFrag=${lFrag}`;

  try {
    const response = await axios.get(searchUrl, { responseType: 'text' });
    const xmlData = response.data;

    res.set('Content-Type', 'application/xml');
    res.send(xmlData);
  } catch (error) {
    console.error('Error querying CiviX API:', error);
    res.status(500).json({ error: 'Error querying the CiviX API' });
  }
});

router.get('/summarize', async (req, res) => {
  const { civix_id, doc_id } = req.query;

  if (!civix_id) {
    return res.status(400).json({ error: 'Civix ID is required' });
  }
  if (!doc_id) {
    return res.status(400).json({ error: 'Doc ID is required' });
  }

  try {
    const apiUrl = `https://www.bclaws.gov.bc.ca/civix/document/id/complete/${civix_id}/${doc_id}`;

    const summary = await summarizeDocument(apiUrl);

    res.json({ summary });
  } catch (error) {
    console.error('Error summarizing content:', error);
    res.status(500).json({ error: 'Error summarizing the content' });
  }
});

module.exports = router;
