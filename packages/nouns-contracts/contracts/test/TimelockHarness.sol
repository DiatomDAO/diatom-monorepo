// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '../governance/Timelock.sol';

interface Administered {
    function _acceptAdmin() external returns (uint256);
}

contract TimelockHarness is Timelock {
    constructor(address admin_, uint256 delay_) Timelock(admin_, delay_) {}

    function harnessSetPendingAdmin(address pendingAdmin_) public {
        pendingAdmin = pendingAdmin_;
    }

    function harnessSetAdmin(address admin_) public {
        admin = admin_;
    }
}

contract TimelockTest is Timelock {
    constructor(address admin_, uint256 delay_) Timelock(admin_, 2 days) {
        delay = delay_;
    }

    function harnessSetAdmin(address admin_) public {
        require(msg.sender == admin);
        admin = admin_;
    }

    function harnessAcceptAdmin(Administered administered) public {
        administered._acceptAdmin();
    }
}
