const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RentalAgreement", function () {
  let RentalAgreement, rental, landlord, tenant;

  beforeEach(async () => {
    [landlord, tenant] = await ethers.getSigners();

    const now = Math.floor(Date.now() / 1000);
    const oneMonth = 30 * 24 * 60 * 60;

    const rent = ethers.parseEther("1.0");
    const deposit = ethers.parseEther("0.5");

    RentalAgreement = await ethers.getContractFactory("RentalAgreement");
    rental = await RentalAgreement.deploy(
      rent,
      deposit,
      now,
      now + oneMonth
    );

    await rental.waitForDeployment();
  });

  it("Should deploy with correct landlord and rent values", async () => {
    expect(await rental.landlord()).to.equal(landlord.address);
    expect(await rental.rentAmount()).to.equal(ethers.parseEther("1.0"));
  });

  it("Tenant can accept rental by sending correct payment", async () => {
    await expect(
      rental.connect(tenant).acceptRental({ value: ethers.parseEther("1.5") })
    )
      .to.emit(rental, "RentalAccepted")
      .withArgs(tenant.address);
  });

  it("Should revert if payment is incorrect", async () => {
    await expect(
      rental.connect(tenant).acceptRental({ value: ethers.parseEther("1.0") })
    ).to.be.revertedWith("Incorrect payment");
  });
});

describe("endRental()", function () {
  let landlord, tenant, rental;
  const oneMonth = 30 * 24 * 60 * 60;
  let now;

  beforeEach(async () => {
    [landlord, tenant] = await ethers.getSigners();
    now = Math.floor(Date.now() / 1000);

    const RentalAgreement = await ethers.getContractFactory("RentalAgreement");
    rental = await RentalAgreement.deploy(
      ethers.parseEther("1.0"),
      ethers.parseEther("0.5"),
      now,
      now + oneMonth
    );

    await rental.waitForDeployment();

    // Tenant accepts rental
    await rental.connect(tenant).acceptRental({ value: ethers.parseEther("1.5") });
  });

  it("Should revert if rental has not ended", async () => {
    await expect(
      rental.connect(landlord).endRental(true)
    ).to.be.revertedWith("Rental period not ended");
  });

  it("Should end rental and send funds to landlord and tenant correctly", async () => {
    // Fast-forward time
    await network.provider.send("evm_increaseTime", [oneMonth + 1]);
    await network.provider.send("evm_mine");

    const landlordBalanceBefore = await ethers.provider.getBalance(landlord.address);
    const tenantBalanceBefore = await ethers.provider.getBalance(tenant.address);

    const tx = await rental.connect(landlord).endRental(true);
    const receipt = await tx.wait();

    const landlordBalanceAfter = await ethers.provider.getBalance(landlord.address);
    const tenantBalanceAfter = await ethers.provider.getBalance(tenant.address);

    // Landlord should get rent (1.0 ETH)
    expect(landlordBalanceAfter).to.be.above(landlordBalanceBefore);

    // Tenant should get deposit (0.5 ETH)
    expect(tenantBalanceAfter).to.be.above(tenantBalanceBefore);
  });

  it("Should send deposit to landlord if landlord rejects refund", async () => {
    await network.provider.send("evm_increaseTime", [oneMonth + 1]);
    await network.provider.send("evm_mine");

    const tx = await rental.connect(landlord).endRental(false);
    const receipt = await tx.wait();

    // Expect event emitted
    const event = receipt.logs.find(log => log.fragment.name === "RentalEnded");
    expect(event.args.endedBy).to.equal(landlord.address);
  });
});
