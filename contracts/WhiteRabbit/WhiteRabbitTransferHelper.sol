pragma solidity ^0.6.2;

// SPDX-License-Identifier: MIT

import "./Ownable.sol";
import "./IERC20.sol";
import "./ITraderJoeRouter.sol";

contract WhiteRabbitTransferHelper is Ownable {
	ITraderJoeRouter router;

	constructor(address routerAddress) public {
		router = ITraderJoeRouter(routerAddress);
	}

	function buy(address tokenAddress) public payable onlyOwner returns (uint256) {
		require(msg.value > 0, "Insufficient value sent");

		address self = address(this);
		IERC20 token = IERC20(tokenAddress);

		// create swap path
		address[] memory path = new address[](2);
		path[0] = router.WAVAX();
		path[1] = tokenAddress;

		// buy tokens
		uint256 previousBalance = token.balanceOf(self);
		router.swapExactAVAXForTokensSupportingFeeOnTransferTokens{value: msg.value}(0, path, self, block.timestamp);
		uint256 amountOut = token.balanceOf(self) - previousBalance;

		// transfer back to owner address
		uint256 previousTokenBalance = token.balanceOf(owner());
		require(token.transfer(owner(), amountOut), "Token transfer failed");
		return token.balanceOf(owner()) - previousTokenBalance;
	}
}
