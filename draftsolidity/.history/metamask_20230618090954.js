const connectBtn = document.getElementById("connect-wallet");

connectBtn.addEventListener("click", () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");

    // Request account access from user
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log("Connected to MetaMask:", accounts[0]);

        // Do something with the connected account
        // For example: display the connected account on the page
        const accountDisplay = document.getElementById("connected-account");
        accountDisplay.textContent = accounts[0];
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.error("MetaMask is not installed!");
  }
});

const MintToken = document.getElementById("set-value");

connectBtn.addEventListener("click", () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");

    // Request account access from user
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log("Connected to MetaMask:", accounts[0]);

        // Do something with the connected account
        // For example: display the connected account on the page
        const accountDisplay = document.getElementById("connected-account");
        accountDisplay.textContent = accounts[0];
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.error("MetaMask is not installed!");
  }
});
