const axios = require('axios');
const cheerio = require('cheerio');
const url = 'http://127.0.0.1:3333/miner';

exports.fetchData = async() => {
  const response = await axios(url);
  return response
  }

