const Web3 = require("web3");
const { abi } = require("./MintableToken.json"); // Import the ABI from the compiled contract JSON file

const web3 = new Web3(window.ethereum);
const contractAddress = "0x780c88B9C54Fbf284b94Bc2f7DaD6F54eC04dd13"; // Replace with your deployed contract address
const mintableToken = new web3.eth.Contract(abi, contractAddress);

// ...

// Inside the .then((accounts) => { ... }) block, add the following code:

const mintTokensBtn = document.getElementById("mint-tokens");

mintTokensBtn.addEventListener("click", () => {
  const account = accounts[0]; // The connected account
  const amountToMint = 100;

  // Call the mint function of the smart contract
  mintableToken.methods
    .mint(account, amountToMint)
    .send({ from: account })
    .then((receipt) => {
      console.log("Tokens minted:", receipt);
    })
    .catch((error) => {
      console.error("Error minting tokens:", error);
    });
});
