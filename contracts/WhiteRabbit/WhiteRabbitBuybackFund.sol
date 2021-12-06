pragma solidity ^0.6.2;

// SPDX-License-Identifier: MIT

import "./Ownable.sol";
import "./IERC20.sol";
import "./ITraderJoeRouter.sol";

contract WhiteRabbitBuybackFund is Ownable {
    address constant DEAD_ADDRESS = address(57005);

	ITraderJoeRouter router;
    IERC20 token;

    uint256 public totalAvaxDeposited;
    uint256 public totalAvaxBought;
    uint256 public totalTokensBought;

    event Deposit(uint256 amount);
    event BuybackIssued(uint256 amountIn, uint256 amountOut);

	constructor(address routerAddress, address tokenAddress) public {
		router = ITraderJoeRouter(routerAddress);
        token = IERC20(tokenAddress);
	}

	function buyback(uint256 amountIn) external onlyOwner returns (uint256) {
		require(amountIn > 0, "Insufficient value sent");
        require(address(this).balance >= amountIn, "Insufficient balance");

		// create swap path
		address[] memory path = new address[](2);
		path[0] = router.WAVAX();
		path[1] = address(token);

		// buy tokens
        uint256 previousBalance = token.balanceOf(DEAD_ADDRESS);
		router.swapExactAVAXForTokensSupportingFeeOnTransferTokens{value: amountIn}(0, path, DEAD_ADDRESS, block.timestamp);
        uint256 amountBoughtBack = token.balanceOf(DEAD_ADDRESS) - previousBalance;

        // track for statistics
        totalAvaxBought += amountIn;
        totalTokensBought += amountBoughtBack;

        emit BuybackIssued(amountIn, amountBoughtBack);
	}

    function deposit() external payable onlyOwner {
        totalAvaxDeposited += msg.value;
        emit Deposit(msg.value);
    }
}
