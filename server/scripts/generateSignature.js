const  secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
require('dotenv').config();

async function generateSignedDigitalSignature(PRIVATE__KEY) {
    if (PRIVATE__KEY) {
	    const message = "I APPROVE TRANSFER OF BALANCE FOR THIS TRANSACTION.";
	    // const ts = Date.now();
	    const hashedMessage = await keccak256(utf8ToBytes(message));
	    	// +ts));
	    const [signature, recoveryBit] = await secp.sign(hashedMessage, PRIVATE__KEY, {recovered: true} );
		if (recoveryBit) {
			console.log("Message Hash:\n", toHex(hashedMessage),"\nSignature: \n", toHex(signature), "\nRecovery Bit: \n",  recoveryBit);			
		}
	   // return [toHex(hashedMessage), toHex(signature), recoveryBit];
	}
}

generateSignedDigitalSignature(process.env.PRIVATE___KEY___1)
// generateSignedDigitalSignature(process.env.PRIVATE___KEY___2);
// generateSignedDigitalSignature(process.env.PRIVATE___KEY___3);