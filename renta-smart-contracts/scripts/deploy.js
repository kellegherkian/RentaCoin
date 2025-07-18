// scripts/deploy.js
const hre = require("hardhat");


async function main() {

  const { ethers } = hre;

  console.log("🔍 Deploying RentalAgreement contract...");

  const RentalAgreement = await hre.ethers.getContractFactory("RentalAgreement");

  // Example deployment: 1 ETH rent, 0.5 ETH deposit, starting now, ending in 30 days
  const now = Math.floor(Date.now() / 1000);
  const thirtyDays = 30 * 24 * 60 * 60;

   const rentAmount = ethers.utils.parseEther("1.0");   // 1 ETH
  const deposit = ethers.utils.parseEther("0.5");      // 0.5 ETH

  const contract = await RentalAgreement.deploy(
    rentAmount,
    deposit,
    now,
    now + thirtyDays
  );

  await contract.deployed();

  console.log("✅ RentalAgreement deployed to:", contract.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
// To run this script, use the command: npx hardhat run scripts/deploy.js --network <network_name>