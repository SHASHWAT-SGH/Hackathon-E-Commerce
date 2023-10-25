// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; // solidity version

// contract is similar to class in oops
contract Transactions {
    uint256 transactionCounter; //state variable: State variables are variables whose values are permanently stored in contract storage.

    /* 
        Event is an inheritable member of a contract. An event is emitted, it stores the arguments 
        passed in transaction logs. These logs are stored on blockchain and are accessible using 
        address of the contract till the contract is present on the blockchain. An event generated 
        is not accessible from within contracts, not even the one which have created and emitted them.
    */
    event Transfer(
        address sender,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // same as object in js
    // it will store crtpto transfer information properties
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // array of TransferStruct to store all the transaction details
    TransferStruct[] transactions;

    // it is similar as: public void addToBlockChain() in java
    function addToBlockChain(
        address payable receiver, // payable is a keyword which is implicitly converted to address only
        uint amount,
        string memory message, // memory variables are only available till execution of the contract
        string memory keyword
    ) public {
        transactionCounter += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        // emiting the transfer event will store the transaction log in blockchain, can be accessed using the address
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    // view functions are functions which can only read the state variables (not modify),
    // it will give  warning
    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTansactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}
