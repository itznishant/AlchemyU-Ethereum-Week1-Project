const  secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
require('dotenv').config();

export async function generateSignedDigitalSignature(PRIVATE__KEY) {
    const [PRIVATE_KEY_1, PRIVATE_KEY_2, PRIVATE_KEY_3] =
    	[process.env.PRIVATE___KEY___1, process.env.PRIVATE___KEY___2, process.env.PRIVATE___KEY___3];

    if (PRIVATE__KEY) {
        const VALID_PRIVATE_KEY = PRIVATE__KEY === PRIVATE_KEY_1 
        ? PRIVATE_KEY_1 : PRIVATE__KEY === PRIVATE_KEY_2 ? PRIVATE_KEY_2 : 
        	PRIVATE__KEY === PRIVATE_KEY_3 ? PRIVATE_KEY_3: "";

        if(VALID_PRIVATE_KEY) {
	        const PUBLIC_KEY_FULL   = secp.getPublicKey(VALID_PRIVATE_KEY);
	        const PUBLIC_KEY        = toHex(keccak256(PUBLIC_KEY_FULL).slice(-20));

	        const message                   = "I APPROVE TRANSFER OF BALANCE FOR THIS TRANSACTION AT: ";
	        const ts = Date.now();

	        const hashedMessage             = await keccak256(utf8ToBytes(message+ts));
	        const [signature, recoveryBit]  = await secp.sign(hashedMessage, VALID_PRIVATE_KEY, {recovered: true} );

	        const PUBLIC_KEY_RECOVERED      = await secp.recoverPublicKey(hashedMessage, signature, recoveryBit);
        }
    }
    return hashedMessage;
}