// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    uint storageData;

    function get() public view returns(uint) {
        return storageData;
    }
    // yaha virtual written to allow overriding of the function in the inheritance file
    function set(uint n) public virtual {
        storageData = n;
    }

    function increment(uint n) public {
        storageData = storageData + n;
    }

    function decrement(uint n) public {
        storageData = storageData - n;
    }

}