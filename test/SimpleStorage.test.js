const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EGGV2", function () {
  it("Created a egg token", async function () {


    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();


    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();

    console.log(simpleStorage.address)

    const store1 = await simpleStorage.store(1);

  });
});
