// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  console.log("🔍 Deploying RentalAgreement contract...");

  const RentalAgreement = await ethers.getContractFactory("RentalAgreement");

  const now = Math.floor(Date.now() / 1000);
  const thirtyDays = 30 * 24 * 60 * 60;

  const rentAmount = ethers.parseEther("1.0");    // 1 ETH
  const deposit = ethers.parseEther("0.5");       // 0.5 ETH

  const contract = await RentalAgreement.deploy(
    rentAmount,
    deposit,
    now,
    now + thirtyDays
  );

  // ethers v6: deployment returns a contract object with .target as address
  console.log("✅ RentalAgreement deployed to:", contract.target);

  // OPTIONAL: save to file if needed later
  const fs = require("fs");
  fs.writeFileSync(
    "deployedAddress.json",
    JSON.stringify({ address: contract.target }, null, 2)
  );
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
