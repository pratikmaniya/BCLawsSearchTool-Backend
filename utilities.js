const axios = require('axios');
const OpenAI = require('openai');
const cheerio = require('cheerio');
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY
});

async function generateSummary(text) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `Summarize the following document content in a short paragraph:\n\n${text}`
            }
          ]
        }
      ]
    });
    const summary = response.choices[0].message.content.trim();

    return summary;
  } catch (error) {
    console.error('Error fetching summary:', error.response ? error.response.data : error.message);
  }
}

async function fetchXMLDocument(apiUrl) {
  try {
    const response = await axios.get(apiUrl, { headers: { 'Content-Type': 'application/xml' } });
    return response.data;
  } catch (error) {
    console.error('Error fetching XML document:', error.message);
  }
}

async function extractTextFromHTML(htmlContent) {
  try {
    const $ = cheerio.load(htmlContent);
    const plainText = $('body').text();

    return plainText;
  } catch (error) {
    console.error('Error parsing XML:', error.message);
  }
}

async function summarizeDocument(apiUrl) {
  const xmlDocument = await fetchXMLDocument(apiUrl);
  const extractedText = await extractTextFromHTML(xmlDocument);

  if (!extractedText) {
    console.log('No relevant text found in the XML document.');
    return;
  }

  const summary = await generateSummary(extractedText);
  return summary
}

module.exports = { summarizeDocument }