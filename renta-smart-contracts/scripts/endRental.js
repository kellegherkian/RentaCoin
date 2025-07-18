const hre = require("hardhat");

async function main() {
  const { ethers } = hre;

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // your deployed contract

  const rental = await ethers.getContractAt("RentalAgreement", contractAddress);

  // Simulate time passing (advance 31 days)
  const thirtyOneDays = 31 * 24 * 60 * 60;
  await hre.network.provider.send("evm_increaseTime", [thirtyOneDays]);
  await hre.network.provider.send("evm_mine");

  console.log("⏱ Time advanced. Calling endRental...");

  const landlordApprovesRefund = true;
  const tx = await rental.endRental(landlordApprovesRefund);
  await tx.wait();

  console.log("✅ Rental ended successfully.");
}

main().catch((err) => {
  console.error("❌ End rental failed:", err);
  process.exit(1);
});
