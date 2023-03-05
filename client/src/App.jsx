// import Wallet from "./Wallet";
import WalletSecure from "./WalletSecure";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");

  return (
    <div className="app">
      <WalletSecure
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        signature={signature}
        setSignature={setSignature}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
