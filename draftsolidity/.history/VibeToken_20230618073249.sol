// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VibeToken is ERC20, Ownable {
    constructor() ERC20("VibeToken", "BLK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // contract VibeToken is ERC20, Ownable {
    //     // Mapping to store whether an address has already claimed their free tokens
    //     mapping(address => bool) public hasClaimedTokens;

    //     constructor() ERC20("Vibe Token", "BLK") {
    //         _mint(msg.sender, 1000000 * 10 ** decimals());
    //     }

    //     // Function to claim free tokens, can only be called once per address
    //     function claimFreeTokens() public {
    //         require(
    //             !hasClaimedTokens[msg.sender],
    //             "Address has already claimed free tokens"
    //         );
    //         uint256 freeTokens = 100 * 10 ** decimals();
    //         _mint(msg.sender, freeTokens);
    //         hasClaimedTokens[msg.sender] = true;
    //     }

    // Function to mint tokens, only callable by the contract owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
