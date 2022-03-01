require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const AVALANCHE_URL="https://api.avax-test.network/ext/bc/C/rpc";
const MY_PRIVATE_KEY="6c1261e0401b5f878341c4b545e019bf14537f6c937b3e4e1267c3d22d3540a9";
const AVAX_API_KEY="P1UVUS7PUC4GJ4EZD2HTZ7URK35KA31UAP";
const ETH_API_KEY="5KEIC2ZH9C23VSXFUQHHMX27T74FZCXPMZ";

// Replace this private key with your Fuji wallet private key
const FUJI_PRIVATE_KEY = '6c1261e0401b5f878341c4b545e019bf14537f6c937b3e4e1267c3d22d3540a9';

// Replace this with your Datahub api key
const DATAHUB_API_KEY = '75e56a431c52de30ce4685371a627c0c';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
      hardhat: {
        chainId: +process.env.HARDHAT_CHAIN_ID || 1337
      },
    fuji: {
      url: `https://avalanche--fuji--rpc.datahub.figment.io/apikey/${DATAHUB_API_KEY}/ext/bc/C/rpc`,
      accounts: [`0x${FUJI_PRIVATE_KEY}`],
      gasPrice: 225000000000,
      chainId: 43113,
    },
    avalanche: {
      url: `${AVALANCHE_URL}`,
      accounts: [`0x${MY_PRIVATE_KEY}`],
      gasPrice: 225000000000,
      chainId: 43113,
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [`0x${MY_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/99a77a09a81b4db58b2c7a902f1d77a3",
      accounts: [`0x${MY_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: `${AVAX_API_KEY}`
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};

//NFT Contract: 0xf201Db933f0F7281dE9d64A60ACD1e05da04de40
// npx hardhat run scripts/NFT.deploy.js --network fuji 
// npx hardhat verify --network fuji 0xf201Db933f0F7281dE9d64A60ACD1e05da04de40 FishNFT FISH ipfs://QmSgBpAVYM9J7B6jd81EZtHV9oXJVkMdLyXNUhN9AUVnRx 150


//ChickenRunV4 COntract: 0x1871da5b2D833dF195973f159420Ab1A60Adf6de
//EGGV2 Contract: 0x1756Ff1EefA3FF4Cc52Fc98831e81009Cf908c1f
//FeedV2 COntract:  0x91e19E748e6EaA752a8Cd1fFC835D7e7Cb4606dC