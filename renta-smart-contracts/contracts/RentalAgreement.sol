// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalAgreement {
    address public landlord;
    address public tenant;

    uint public rentAmount;
    uint public deposit;
    uint public rentalStart;
    uint public rentalEnd;

    uint public escrowBalance;

    enum RentalStatus { NotStarted, Active, Cancelled, Completed }
    RentalStatus public rentalStatus;

    // Events
    event RentalAccepted(address indexed tenant);
    event RentalEnded(address indexed endedBy);
    event PaymentSent(address indexed from, uint amount, string paymentType);
    event RentalCancelled(address indexed by, uint refund);

    constructor(uint _rentAmount, uint _deposit, uint _rentalStart, uint _rentalEnd) {
        landlord = msg.sender;
        rentAmount = _rentAmount;
        deposit = _deposit;
        rentalStart = _rentalStart;
        rentalEnd = _rentalEnd;
        rentalStatus = RentalStatus.NotStarted;
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

    modifier isActiveRental() {
        require(rentalStatus == RentalStatus.Active, "Not active");
        _;
    }

    function acceptRental() external payable {
        require(rentalStatus == RentalStatus.NotStarted, "Rental already started or cancelled");
        require(msg.value == rentAmount + deposit, "Incorrect payment");

        tenant = msg.sender;
        escrowBalance += msg.value;
        rentalStatus = RentalStatus.Active;

        emit RentalAccepted(msg.sender);
        emit PaymentSent(msg.sender, msg.value, "Rent + Deposit");
    }

    function cancelByTenant() external onlyTenant {
        require(rentalStatus == RentalStatus.NotStarted, "Cannot cancel now");

        rentalStatus = RentalStatus.Cancelled;
        uint refund = escrowBalance;
        escrowBalance = 0;
        payable(tenant).transfer(refund);

        emit RentalCancelled(msg.sender, refund);
    }

    function cancelByLandlord() external onlyLandlord {
        require(rentalStatus == RentalStatus.Active, "Rental must be active");
        require(block.timestamp < rentalStart, "Rental already started");

        rentalStatus = RentalStatus.Cancelled;
        uint refund = escrowBalance;
        escrowBalance = 0;
        payable(tenant).transfer(refund);

        emit RentalCancelled(msg.sender, refund);
    }

    function endRental(bool landlordApprovesRefund) external onlyParties isActiveRental {
        require(block.timestamp > rentalEnd, "Rental period not ended");

        rentalStatus = RentalStatus.Completed;

        uint rent = rentAmount;
        uint depositAmount = deposit;
        escrowBalance = 0;

        if (landlordApprovesRefund) {
            payable(tenant).transfer(depositAmount);
        } else {
            rent += depositAmount;
        }

        payable(landlord).transfer(rent);

        emit RentalEnded(msg.sender);
    }

    function isTenant() public view returns (bool) {
        return tenant != address(0);
    }
}
