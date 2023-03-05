const express = require("express");
const { keccak256 } = require("ethereum-cryptography/keccak");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "f02dd9aa1ce62bf1e3b88a45e7c46c29fa6c2957": 100,  // 100
  "5498d0c58b10e0ee2faf4fa5d7f3e7431c8041c3": 50,   // 50
  "8614281c6df153041bac17184c7ab934d264ff4b": 75,   // 75
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
