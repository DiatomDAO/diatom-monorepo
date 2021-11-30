// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.6;

import { IWhalezAuctionHouse } from '../interfaces/IWhalezAuctionHouse.sol';

contract MaliciousBidder {
    function bid(IWhalezAuctionHouse auctionHouse, uint256 tokenId) public payable {
        auctionHouse.createBid{ value: msg.value }(tokenId);
    }

    receive() external payable {
        assembly {
            invalid()
        }
    }
}
