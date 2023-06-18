// JavaScript code (app.js)

const contractAddress = "0x1234567890123456789012345678901234567890";
const contractABI = [
  {
    inputs: [],
    name: "getValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "setValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider.getSigner()
);

async function updateValue() {
  const value = await contract.getValue();
  const valueElement = document.getElementById("current-value");
  valueElement.textContent = value.toString();
}

async function setValue() {
  const newValue = document.getElementById("new-value").value;
  const tx = await contract.setValue(newValue);
  await tx.wait();
  updateValue();
}

updateValue();
document.getElementById("set-value").addEventListener("click", setValue);
