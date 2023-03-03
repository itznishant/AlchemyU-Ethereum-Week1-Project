import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function WalletSecure({ address, setAddress, balance, setBalance, signature, setSignature}) {
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);

    try {
      // const hashedMessage = keccak256(utf8ToBytes(message));
      
      address = toHex(keccak256(secp.recoverPublicKey(hashedMessage, signature, 0)).slice(-20));
      setAddress(address);
      
      console.log(`Address: ${address}`);
    } catch (err) {
      console.log("Error:" , err);

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
        Digital Signature

        <input placeholder="Fill in a Signature" value={signature} onChange={onChange}></input>
      </label>

{/*      <label>
        Recovery Bit
        <input placeholder="Recovery Bit" value={recoveryBit}></input>
      </label>
*/}
      <div>
        <b>Signature:</b> {signature} 
        <br /> <br />
        <b>Address:</b> {address}
      </div>
      <br />
      
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default WalletSecure;
