'use strict'
const path = require('path')
const { authenticate } = require('@google-cloud/local-auth');
const config = {
  "keyFilePath": "./credentials.json",
  "scope": "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing"
}

async function generate() {
  const keyFilePath = path.resolve(__dirname, config.keyFilePath)
  const client = await authenticate({
    keyfilePath: keyFilePath,
    scopes: [config.scope],
  });

  if (client.credentials) {
    console.log(client.credentials)
  }
}
generate();