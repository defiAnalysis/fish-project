const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FeedV2", function () {
  it("Feed Control", async function () {


    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();


    //const ChickenRunV4 = await ethers.getContractFactory("ChickenRunV4");
    //const chickenRunV4 = await ChickenRunV4.deploy();
    //await chickenRunV4.deployed();

    //await chickenRunV4.deployed();
    //console.log(chickenRunV4.address)

    /*
    const FeedV2 = await ethers.getContractFactory("FeedV2");
    //const eggV2 = await EggV2.deploy(chickenRunV4.address);
    //const feedV2 = await FeedV2.deploy("0x1871da5b2D833dF195973f159420Ab1A60Adf6de","0x1756Ff1EefA3FF4Cc52Fc98831e81009Cf908c1f");
    await feedV2.deployed();
*/

    const ChickenRunV4 = await ethers.getContractFactory("ChickenRunV4");
    //const eggV2 = await EggV2.deploy(chickenRunV4.address);
    const chickenRunV4 = await ChickenRunV4.deploy();
    await chickenRunV4.deployed();


    const EggV2 = await ethers.getContractFactory("EggV2");
    const eggV2 = await EggV2.connect(owner).deploy(chickenRunV4.address);
    await eggV2.connect(owner).deployed();

    const FeedV2 = await ethers.getContractFactory("FeedV2");
    const feedV2 = await FeedV2.connect(owner).deploy(chickenRunV4.address,eggV2.address );
    await feedV2.connect(owner).deployed();

    
    
    let result = await chickenRunV4.initialize(
      chickenRunV4.address,
      chickenRunV4.address,
      1,
      1,
      "ipfs://QmSgBpAVYM9J7B6jd81EZtHV9oXJVkMdLyXNUhN9AUVnRx",
      chickenRunV4.address,
      true,
      true
      
    );
   
     result = await chickenRunV4.mint(1,
       { from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", value : 1  } );
     console.log(result)


    /*
    result = await eggV2.mintEgg("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",10);
    console.log(result)

    result = await eggV2.claimableView(1);
    console.log("egg claimableView",result);

   // result = await eggV2.stake([1,2,3,4,5]);
*/



    
    /*

    result = await feedV2.addAuthorized("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
    //console.log(result)

    result = await feedV2.staking(1);
    console.log(result)

    result = await feedV2.claimableView(1);
    console.log(result)
    */


    

    //let result = await feedV2.claimableView("0x183D17Ab2F840eB6B0239ACe121A1e3E6E50F53D");
    //console.log(result)

    /*

    let result = await eggV2.stake([1,2]);
    console.log(result);

    result = await eggV2.claimEggs([1,2]);
    console.log(result);

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
