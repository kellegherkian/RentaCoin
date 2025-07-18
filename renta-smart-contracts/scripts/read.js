const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const RentalAgreement = await ethers.getContractFactory("RentalAgreement");

  const rental = await RentalAgreement.attach(contractAddress);

  const landlord = await rental.landlord();
  const rentAmount = await rental.rentAmount();

  console.log("🧾 Landlord:", landlord);
  console.log("💰 Rent Amount (wei):", rentAmount.toString());
  console.log("💰 Rent Amount (ETH):", ethers.formatEther(rentAmount));
}

main().catch((err) => {
  console.error("❌ Read failed:", err);
  process.exit(1);
});
