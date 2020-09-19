const axios = require('axios');
const config = require('./config');

const coinMarketCapApi = async () => {
  const url = config.cmcConfig.url;
  const requestOptions = {
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
    const axiosResponse = await axios.get(url, requestOptions);
    return axiosResponse.data;
  } catch (err) {
    console.log('API call error:', err.message);
  }
}

module.exports = coinMarketCapApi;