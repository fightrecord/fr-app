const fetch = require('node-fetch');
const { api_url, client_id, client_secret } = require('../../config/paypal-live');

let accessToken;
exports.getAccessToken = async () => {
  if (accessToken) {
    console.log('Get access token from cache');
    return accessToken;
  }

  console.log('Get access token from PayPal');
  const apiPath = `${api_url}/v1/oauth2/token`;
  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const payload = {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuth}`,
      'Accept-Language': 'en_US'
    }
  };

  accessToken = await fetch(apiPath, payload).then(res => res.json());
  console.log(`Token expires in ${accessToken.expires_in} seconds`);

  return accessToken;
};
