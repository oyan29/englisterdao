// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";

contract DAOTreasury is Ownable {

    // 200,000YEN = 1ETH -> 1YEN = 1Token = 0.000005 ETH
    uint private _oneGWei = 1000000000 wei;
    uint private _exchangeRate = _oneGWei * 5000;

    constructor (){

    }

    /**
     * @notice Charges for ETH held by Treasury.
     */
    function getBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    /**
     * @notice Can't pull out ETH(balance) anyone.
     */
    //function withdraw() external onlyOwner {
        // owner.transfer(address(this).balance);
    //}



    function setExchangeRate(uint newRate) external onlyOwner {
        _exchangeRate = newRate;
    }

    /**
     * @notice Exchange DAOTokens to Ethereum(ETH).
     */
    function requestForTokenToEth( uint amount ) external {
        
        // Verify that hold the DAOTokens.

        // Burn the exchanged DAOTokens.

        // Transfer Ethereum(ETH).
        // https://github.com/OpenZeppelin/openzeppelin-contracts/issues/3008
        Address.sendValue(payable(msg.sender), (amount * _exchangeRate));
    }
}