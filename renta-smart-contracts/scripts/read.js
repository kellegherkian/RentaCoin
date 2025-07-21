// scripts/read.js
const hre = require("hardhat");

async function main() {
  const { ethers } = hre;
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const RentalAgreement = await ethers.getContractFactory("RentalAgreement");
  const rental = await RentalAgreement.attach(contractAddress);

  console.log("📄 Tenant:", await rental.tenant());
  console.log("✅ Is Accepted:", await rental.isAccepted());
  console.log("💸 Rent Paid:", await rental.rentPaid());
  console.log("💰 Deposit Paid:", await rental.depositPaid());
}

main().catch((err) => {
  console.error("❌ Read failed:", err);
  process.exit(1);
});
