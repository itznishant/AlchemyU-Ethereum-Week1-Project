const  secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
require('dotenv').config();


async function getSign() { 
	const priv_key = secp.utils.randomPrivateKey();
	const PK  = await secp.getPublicKey(priv_key);

	console.log(toHex(priv_key)); 
	console.log(" ");
	console.log([toHex(PK), toHex(keccak256(PK).slice(-20))]);
}


getSign();