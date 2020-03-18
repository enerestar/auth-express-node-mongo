const axios = require('axios');
const config = require('./config');

const coinMarketCapApi = async () => {
  const requestOptions = {
    method: 'GET',
    url: config.cmcConfig.url,
    qs: {
      'start': '1',
      'limit': '5000',
      'convert': 'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.cmcConfig.key
    },
    json: true,
    gzip: true
  };
  
  try {
    const axiosResponse = await axios.get(requestOptions.url, requestOptions);
    return axiosResponse.data;
  } catch (err) {
    console.log('API call error:', err.message);
  }
}

module.exports = coinMarketCapApi;