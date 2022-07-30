// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";

import "./IDAOToken.sol";

contract DAOTreasury is Ownable {

    IDAOToken private _DAOTokenContract;

    function setDAOTokenContractAddress(address _address) external onlyOwner {
        _DAOTokenContract = IDAOToken(_address);
    }

    constructor () {

    }

    /**
     * @notice Charges for ETH held by Treasury.
     */
    function getBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    /**
     * @notice Can't pull out ETH(balance) anyone.
     * Below is a sample code.
     * This code is withdraw the full amount to the owner's wallet.
     * It's comment out.
     */
    //function withdraw() external onlyOwner {
    //    Address.sendValue(payable(this.owner()), address(this).balance);
    //}

    /**
     * @notice Exchange DAOTokens to Ethereum(ETH).
     */
    function requestForTokenToEth( uint256 _amount ) external returns(bool) {
        /*
            Verify that hold(balance) the DAOTokens.
        */
        uint256 balance = _DAOTokenContract.balanceOf(address(msg.sender));
        if ( balance < _amount ) return false;

        /*
            Transfer Ethereum(ETH).
        */
        uint256 total_supply = _DAOTokenContract.totalSupply();             // Get the totalSupply of DAOTokens.
        uint pay_val = (address(this).balance * _amount) / total_supply;    // Calculate the payment value.
        // https://github.com/OpenZeppelin/openzeppelin-contracts/issues/3008
        Address.sendValue(payable(msg.sender), pay_val);

        /*
            TODO:
                送金で、Errorが発生した場合を想定して、Try Catchするべき。しかし、以下のコンパイルエラーが発生する。
                Try can only be used with external function calls and contract creation calls.
                確かに、sendValue(...) は、Internal である。
                何がしかのトリックが必要と思われる。
                送付するeternalな関数を別に作って、this.sendValueとして自身のメソッドを呼び出すと上手くいくか？
        */

        /*
            Burn the exchanged DAOTokens.
        */
        _DAOTokenContract.burn(address(msg.sender), _amount);
        
        return true;
    }
}
