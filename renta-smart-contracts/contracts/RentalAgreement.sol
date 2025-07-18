// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalAgreement {
    address public landlord;
    address public tenant;

    uint public rentAmount;
    uint public deposit;
    uint public rentalStart;
    uint public rentalEnd;

    bool public isActive;
    bool public isAccepted;
    bool public rentPaid;
    bool public depositPaid;

    // Events for UI/frontend
    event RentalAccepted(address indexed tenant);
    event RentalEnded(address indexed endedBy);
    event PaymentSent(address indexed from, uint amount, string paymentType);

    constructor(uint _rentAmount, uint _deposit, uint _rentalStart, uint _rentalEnd) {
        landlord = msg.sender;
        rentAmount = _rentAmount;
        deposit = _deposit;
        rentalStart = _rentalStart;
        rentalEnd = _rentalEnd;
        isActive = true;
    }

    modifier onlyLandlord() {
        require(msg.sender == landlord, "Only landlord");
        _;
    }

    modifier onlyTenant() {
        require(msg.sender == tenant, "Only tenant");
        _;
    }

    modifier onlyParties() {
        require(msg.sender == landlord || msg.sender == tenant, "Not authorized");
        _;
    }

    function acceptRental() external payable {
        require(!isAccepted, "Already accepted");
        require(msg.value == rentAmount + deposit, "Incorrect payment");

        tenant = msg.sender;
        isAccepted = true;
        rentPaid = true;
        depositPaid = true;

        emit RentalAccepted(msg.sender);
        emit PaymentSent(msg.sender, msg.value, "Rent + Deposit");
    }

    function endRental(bool landlordApprovesRefund) external onlyParties {
        require(block.timestamp > rentalEnd, "Rental period not ended");
        require(isActive, "Already ended");

        isActive = false;

        // Logic: return deposit to tenant if landlord agrees, otherwise send it to landlord
        if (landlordApprovesRefund) {
            payable(tenant).transfer(deposit);
        } else {
            payable(landlord).transfer(deposit);
        }

        // Rent always goes to landlord
        payable(landlord).transfer(rentAmount);

        emit RentalEnded(msg.sender);
    }

    function isTenant() public view returns (bool) {
        return tenant != address(0);
    }
}
