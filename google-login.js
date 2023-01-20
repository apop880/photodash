'use strict'
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { authenticate } = require('@google-cloud/local-auth');
const config = {
  "keyFilePath": "./credentials.json",
  "savedTokensPath": "./token.json",
  "scope": "https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing"
}

async function generate() {
  const keyFilePath = path.resolve(__dirname, config.keyFilePath)
  const client = await authenticate({
    keyfilePath: keyFilePath,
    scopes: [config.scope],
  });

  if (client.credentials && config.savedTokensPath) {
    if (config.savedTokensPath) {
      const tp = path.resolve(__dirname, config.savedTokensPath)
      console.log(client.credentials)
      mkdirp(path.dirname(tp), () => {
        fs.writeFileSync(tp, JSON.stringify(client.credentials))
        console.log("Token is generated. check it. (ls -al)")
      })
    }
  }
}
generate();