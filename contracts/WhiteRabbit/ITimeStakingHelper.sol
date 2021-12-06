pragma solidity ^0.6.2;

// SPDX-License-Identifier: MIT

interface ITimeStakingHelper {
	function staking() external view returns (address);
	function stake(uint _amount, address recipient) external;
}
