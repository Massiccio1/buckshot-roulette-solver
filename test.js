// const f = require('node-fetch');


// Example usage:
const apiUrl = 'https://api.waifu.pics/many/sfw/wink';
const requestBody = {
  exclude: [],
  key2: 'value2',
};

fetchDataWithBody(apiUrl, requestBody)
  .then((responseData) => {
    // Handle the response data here
  })
  .catch((error) => {
    // Handle errors here
  });