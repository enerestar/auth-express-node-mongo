const axios = require('axios');
const config = require('./config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const apiCall = async () => {
    const requestOptions = {
        url: config.clientConfig.url,
        headers: {
            'API_KEY': config.clientConfig.key
        }
    }
    try {
        const axiosResponse = await axios.get(requestOptions.url, requestOptions);
        console.log(axiosResponse.data);
        return axiosResponse.data
    } catch(err) {
        console.log(err)
    }
}

apiCall();