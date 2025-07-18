const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const RentalAgreement = await ethers.getContractFactory("RentalAgreement");

  // Connect as a different Hardhat account (e.g. account #1)
  const [_, tenantSigner] = await ethers.getSigners();

  const rental = await RentalAgreement.attach(contractAddress).connect(tenantSigner);

  console.log("📨 Tenant sending 1.5 ETH to accept rental...");

  const tx = await rental.acceptRental({
    value: ethers.parseEther("1.5"),
  });

  await tx.wait();

  console.log("✅ Rental accepted! Tenant set to:", await rental.tenant());
}

main().catch((error) => {
  console.error("❌ Tenant interaction failed:", error);
  process.exit(1);
});
