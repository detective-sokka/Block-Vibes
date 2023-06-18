import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [ walletId, setWalletId ] = useState("");
  const navigate = useNavigate();

  async function getWalletId() {
    // Check if MetaMask is available
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
  
      try {
        // Request access to the user's accounts
        await window.ethereum.enable();
  
        // Get the current account
        const accounts = await web3.eth.getAccounts();
  
        // Retrieve the wallet ID
        setWalletId(accounts[0]);
        dispatch({type: String, payload:accounts[0]});

      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("MetaMask is not available");
    }
  }
  
  const configureMoonbaseAlpha = async () => {
    
    const provider = await detectEthereumProvider({ mustBeMetaMask: true });
    if (provider) {
      try {
        await provider.request({ method: "eth_requestAccounts" });
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x507", // Moonbase Alpha's chainId is 1287, which is 0x507 in hex
              chainName: "Moonbase Alpha",
              nativeCurrency: {
                name: "DEV",
                symbol: "DEV",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.api.moonbase.moonbeam.network"],
              blockExplorerUrls: ["https://moonbase.moonscan.io/"],
            },
          ],
        });                          
        
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error("Please install MetaMask");
    }
  };

  const navigateLogin = () => {
    
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <button
          className="btn waves-effect waves-light #3f51b5 indigo w-100"
          onClick={() => 
            {
              configureMoonbaseAlpha()              
              getWalletId();                                                        
              navigate("/");            
            }
          }
        >
          Connect to MetaMask
        </button>
      </div>
    </div>
  );
};

export default Login;