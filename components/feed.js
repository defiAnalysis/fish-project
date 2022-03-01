
import FeedV2Json from "../src/artifacts/contracts/FeedV2.sol/FeedV2.json";
import React, { useEffect, useState, useRef } from "react";
import { hasEthereum } from "../utils/ethereum";
import { ethers } from "ethers";


function Feed() {


  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const [totalSupply, setTotalSupply] = useState('');
  const [symbolName, setSymbolName] = useState('');
  const [tokenName, setTokenName] = useState('');

  
  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  
    // Request access to MetaMask account
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' } )
      }


      async function getContract() {
        if (!hasEthereum()) {
          setConnectedWalletAddressState(`MetaMask unavailable`);
          return;
        }
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          process.env.FEEDV2_CONTRACT_ADDRESS,
          FeedV2Json.abi,
          provider
        );
        return contract;
      }

      async function getTotalSupply() {
        try {
        const contract = await getContract();
        const data = await contract.totalSupply();
        setTotalSupply(data.toString())
        } catch (error) {
           console.log(error)
        }

      }

      async function getTokenName() {
        try {
        const contract = await getContract();
        const data = await contract.name();
        setTokenName(data)
        } catch (error) {
           console.log(error)
        }

      }


      async function getSymbolName() {
        try {
        const contract = await getContract();
        const data = await contract.symbol();
        setSymbolName(data)
        } catch (error) {
           console.log(error)
        }

      }


      function handleChangeSymbolName(event) {
        this.setSymbolName( { value: event.target.value });
     }

      function handleChangeTotalSupply(event) {
        this.setTotalSupply( { value: event.target.value });
     }

     function handleChangeTokenName(event) {
      this.setTokenName( { value: event.target.value });
   }

    return (
        <section>
        <h2 className="text-4xl font-semibold mb-8">Feed Token Functions</h2>
        <label className="bg-green-500 text-2xl text-white">Read & Write Functions</label>
        <br />

          
        <div id="main" className="m-8 grid grid-cols-3 gap-1 justify-evenly">
 


      {/* First row: Get Total Supply */}
      <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={getTotalSupply}
          >
            Get Total Supply
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
       
       </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        <label value="0" onChange={handleChangeTotalSupply}
        className="font-bold text-2xl text-black"
        >
            {totalSupply}
          </label>
        </div>

    {/* First row: Get Token Name */}
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={getTokenName}
          >
            Get Token Name
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
       
       </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        <label value="0" onChange={handleChangeTokenName}
        className="font-bold text-2xl text-black"
        >
            {tokenName}
          </label>
        </div>



        

              {/* Second row: Get Symbol Name */}
              <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={getSymbolName}
          >
            Get Symbol Name
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
       
       </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        <label value="0" onChange={handleChangeSymbolName}
        className="font-bold text-2xl text-black"
        >
            {symbolName}
          </label>
        </div>


 


  





        </div>
        </section>
    );

}

export default Feed;