// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const FeedV2 = await hre.ethers.getContractFactory("FeedV2");
  const feedV2 = await FeedV2.deploy("0x1871da5b2D833dF195973f159420Ab1A60Adf6de",
  "0x1756Ff1EefA3FF4Cc52Fc98831e81009Cf908c1f");

  //ChickenRunV4 COntract: 0x1871da5b2D833dF195973f159420Ab1A60Adf6de
//EGGV2 Contract: 0x1756Ff1EefA3FF4Cc52Fc98831e81009Cf908c1f

  await feedV2.deployed();

  console.log("FeedV2 deployed to:", feedV2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
