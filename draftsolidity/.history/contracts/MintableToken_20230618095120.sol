// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintableToken is ERC20, Ownable {
    // Constructor to set the token name and symbol
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    // Function to mint tokens
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
//Contract Address
//0x780c88B9C54Fbf284b94Bc2f7DaD6F54eC04dd13
