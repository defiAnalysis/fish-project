
import EggV2Json from "../src/artifacts/contracts/EggV2.sol/EggV2.json";
import React, { useEffect, useState, useRef } from "react";
import { hasEthereum } from "../utils/ethereum";
import { ethers } from "ethers";


function Eggv2() {


  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const [tokenName, setTokenName] = useState('');
  const [symbolName, setSymbolName] = useState('');
  const [claimableView, setClaimableView] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [tids, setTids] = useState([]);
 

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
          process.env.EGGV2_CONTRACT_ADDRESS,
          EggV2Json.abi,
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

      async function getClaimableView(tokenId) {
        try {
          const contract = await getContract();
          const data = await contract.claimableView(tokenId);
          setClaimableView(parseInt(data))
        } catch (error) {
          console.log(error)
        }
      }

      async function setMintEgg(_senderAddress, _amount) {

        if ( ! hasEthereum() ) {
          setConnectedWalletAddressState(`MetaMask unavailable`)
          return
        }

        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const signerAddress = await signer.getAddress()
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
        const contract = new ethers.Contract(process.env.EGGV2_CONTRACT_ADDRESS, EggV2Json.abi, signer)
        console.log(contract)
        const transaction = await contract.mintEgg(_senderAddress,_amount)
        await transaction.wait()

        


      }


      async function setStake(_tids) {
        if ( ! hasEthereum() ) {
          setConnectedWalletAddressState(`MetaMask unavailable`)
          return
        }

        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const signerAddress = await signer.getAddress()
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
        const contract = new ethers.Contract(process.env.EGGV2_CONTRACT_ADDRESS, EggV2Json.abi, signer)
        console.log(contract)
        const transaction = await contract.stake(_tids)
        await transaction.wait()


      }


      async function setClaimEggs(_tids) {

    
        
        if ( ! hasEthereum() ) {
          setConnectedWalletAddressState(`MetaMask unavailable`)
          return
        }

        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const signerAddress = await signer.getAddress()
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
        const contract = new ethers.Contract(process.env.EGGV2_CONTRACT_ADDRESS, EggV2Json.abi, signer)
        console.log(contract)
        const transaction = await contract.claimEggs(_tids)
        await transaction.wait()
        
        


      }

      function handleChangeTotalSupply(event) {
        this.setTotalSupply( { value: event.target.value });
     }


      function handleChangeTokenName(event) {
         this.setTokenName( { value: event.target.value });
      }

      
      function handleChangeSymbolName(event) {
        this.setSymbolName( { value: event.target.value });
     }

     function handleChangeClaimableView(event) {
      this.setClaimableView( { value: event.target.value });
   }




    return (
        <section>
        <h2 className="text-4xl font-semibold mb-8">EggV2 Token Functions</h2>
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
        <label value="0" onChange={handleChangeTokenName}
        className="font-bold text-2xl text-black"
        >
            {symbolName}
          </label>
        </div>


      {/* Third row:Get ClaimableView  */}
                <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={() => getClaimableView(tokenId)}
          >
            {" "}
            Get ClaimableView
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
          {/* Input text */}
          <input
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter a tokenId"
            type="text"
          ></input>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12 font-bold text-2xl">
          <label value={claimableView}>{claimableView}</label>
        </div>


        
      {/* Fourth row:Set mintEgg  */}
      <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={() => setMintEgg(senderAddress,amount)}
          >
            Set Mint Egg
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12 space-x-10">
          {/* Input text */}
          <input
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
            placeholder="Enter sender address"
            type="text"
          ></input>
             <input
            value={amount}
            onChange={(e) => setAmount([e.target.value])}
            placeholder="Enter amount"
            type="text"
          ></input>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        </div>
        
            {/* Fifth row:Set Stake */}
      <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={() => setStake(tids)}
          >
            Set State
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12 space-x-10">
          {/* Input text */}
          <input
            value={tids}
            onChange={(e) => {
              let value = e.target.value;
              setTids(value.split(","));
            }}
            placeholder="Enter tids array"
            type="text"
          ></input>

        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        </div>

                  {/* FiSixthfth row:Set Claim Eggs */}
      <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={() => setClaimEggs(tids)}
          >
            Set Claim Eggs
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12 space-x-10">
          {/* Input text */}
          <input
            value={tids}
            onChange={(e) => {
              let value = e.target.value;
              setTids(value.split(","));
            }}
            placeholder="Enter tids array"
            type="text"
          ></input>

        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        </div>


        </div>
        </section>
    );

}

export default Eggv2;