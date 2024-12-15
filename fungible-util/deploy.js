const Pact = require('pact-lang-api');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
 
const NETWORK_ID = process.env.NETWORK_ID || 'testnet04';
const CHAIN_ID = process.env.CHAIN_ID || '0';
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const CONTRACT_PATH = path.join(__dirname, 'contract.pact');
 
const KEY_PAIR = {
  publicKey: process.env.ADMIN_PUBLIC_KEY || '2cf25d1956ae61d3e7f5e0d00ec01c238bd911a34dd89f0aa21c3cac1e9c1ff9',
  secretKey: process.env.ADMIN_PRIVATE_KEY || '0c762cbef8e0314fe6c9746625d6ae61204a5e5675c94e61c63b2e425cd74c23',
};
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
 
deployContract();
 
async function deployContract() {
  const pactCode = fs.readFileSync(CONTRACT_PATH, 'utf8');
 
  const cmd = {
    networkId: NETWORK_ID,
    keyPairs: KEY_PAIR,
    pactCode: pactCode,
    envData: {
      "contract-admin": {
          "keys": [KEY_PAIR.publicKey],
          "pred": "keys-all"
      },
  },
    meta: {
      creationTime: creationTime(),
      ttl: 600,
      gasLimit: 65000,
      chainId: CHAIN_ID,
      gasPrice: 0.000001,
      sender: "k:" + KEY_PAIR.publicKey,
    },
  };
  const response = await Pact.fetch.send(cmd, API_HOST);
  console.log(`Request key: ${response.requestKeys[0]}`);
  console.log('Transaction pending...');
  const txResult = await Pact.fetch.listen(
    { listen: response.requestKeys[0] },
    API_HOST,
  );
  console.log('Transaction mined!');
  console.log(txResult);
}