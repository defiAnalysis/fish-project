const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EGGV2", function () {
  it("Created a egg token", async function () {


    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();


    //const ChickenRunV4 = await ethers.getContractFactory("ChickenRunV4");
    //const chickenRunV4 = await ChickenRunV4.deploy();
    //await chickenRunV4.deployed();

    //await chickenRunV4.deployed();
    //console.log(chickenRunV4.address)

    const EggV2 = await ethers.getContractFactory("EggV2");
    //const eggV2 = await EggV2.deploy(chickenRunV4.address);
    const eggV2 = await EggV2.deploy("0x1871da5b2D833dF195973f159420Ab1A60Adf6de");
    await eggV2.deployed();

    console.log(eggV2.address);


    //let result = await eggV2.stake([1,2]);
    //console.log(result);


    result = await eggV2.claimEggs([1,2]);
    console.log(result);


    claimableView

    /*
    let result = await eggV2.feedLevelingRate(100);
    console.log(result)

    result = await eggV2.cooldownRate(100);
    console.log(result)
    
    await eggV2.mintEgg(owner.address,1);

    result = await eggV2.claimableView(1);
    console.log(result)

    
    result = await eggV2.burnEggs(owner.address, 1);
    console.log(result)
    */

    //result = await eggV2.checkSkipCoolingOffAmt(100);
    //console.log(result)

    
    //result = await eggV2.skipCoolingOff(1,1);
    //console.log(result)

   // result = await eggV2.sendMoney(owner.address,1);



    


    

    

    

    //await eggV2.cooldownRate(10);



    //expect(await greeter.greet()).to.equal("Hello, world!");

    //const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    //await setGreetingTx.wait();

    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
