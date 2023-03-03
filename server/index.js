const express = require("express");
const { keccak256 } = require("ethereum-cryptography/keccak");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "2129a9c6dc8d2c54470f362be211a4c76100ad62": 100,  // 100
  "18d509a38d29bd99a08baf64abda963659673896": 50,   // 50
  "b229cbbe86ccb7ac40350e43a8b0a29b58572647": 75,   // 75
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  console.log(address);
  console.log(balance);
  res.send({ balance });
});

app.post("/send", (req, res) => {
  
  const { sender, recipient, amount } = req.body;
  console.log(sender);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
