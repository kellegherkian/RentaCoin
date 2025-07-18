const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  console.log("🔍 Deploying RentalAgreement contract...");

  const RentalAgreement = await ethers.getContractFactory("RentalAgreement");

  const now = Math.floor(Date.now() / 1000);
  const thirtyDays = 30 * 24 * 60 * 60;

  const rentAmount = ethers.parseEther("1.0");
  const deposit = ethers.parseEther("0.5");

  const contract = await RentalAgreement.deploy(
    rentAmount,
    deposit,
    now,
    now + thirtyDays
  );

  // ❌ REMOVE this for ethers v6: await contract.deployed();

  console.log("✅ RentalAgreement deployed to:", contract.target); // use .target instead of .address
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
