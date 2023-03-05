import server from "./server";
import React from "react";
import genMesgHash from "../../server/scripts/genMsgHash.js";

import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function WalletSecure({ address, setAddress, balance, setBalance, signature, setSignature}) {
  async function handleChange(event) {
    const signature = event.target.value;
    setSignature(signature);

    try {
      const recoveryBit = 1;
      const hashedMessage = await genMesgHash();
      address = toHex(keccak256(secp.recoverPublicKey(hashedMessage, signature, recoveryBit)).slice(-20));
      setAddress(address);
    } catch (err) {
      console.log("Error:" , err);
      console.log(address);
    }

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        <strong>Digital Signature</strong>
        <input name="signature" placeholder="Fill in a Signature" value={signature} onChange={handleChange}></input>
      </label>

      <div>
        <label> <strong>Address: </strong> {address} </label>
      </div>
      
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default WalletSecure;
