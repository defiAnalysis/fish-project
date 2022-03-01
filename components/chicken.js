import React, { useEffect, useState, useRef } from "react";
import { hasEthereum } from "../utils/ethereum";
import { ethers } from "ethers";
import ChickenRunV4 from "../src/artifacts/contracts/ChickenRunV4.sol/ChickenRunV4.json";
import { data } from "autoprefixer";
import Image from 'next/image'

export default function Chicken() {
  const nameForm = useRef(null);

  const [totalSupply, setTotalSupply] = useState("");
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const [allChickenRun, setAllChickenRun] = useState([]);
  const [tokenURI, setTokenURI] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [balance, setBalance] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [price, setPrice] = useState('');
  const [forSale, setForSale] = useState('');
  const [numberOfToken, setNumberOfToken] = useState('');
  const [nftImageUrl, setNftImageUrl] = useState('');



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

  // Call smart contract, fetch current value

  async function getContract() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.CHICKEN_CONTRACT_ADDRESS,
      ChickenRunV4.abi,
      provider
    );
    return contract;
  }

  async function getTotalSupply() {
    try {
      //const mintAction =  await contract.mint(1);
      const contract = await getContract();
      const data = await contract.totalSupply();
      setTotalSupply(data.toString());
      console.log("deneme...");
    } catch (error) {
      console.log(error);
    }
  }

  async function getTokenURI(tokenId) {
    try {
      const contract = await getContract();
      const data = await contract.tokenURI(tokenId);
      setTokenURI(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getChickenRun(tokenId) {

      const contract = await getContract();
      
      await contract.allChickenRun(tokenId).then(result =>  {
     
        console.log(parseInt(result["tokenId"]));
        console.log(result["mintedBy"]);
        console.log(result["currentOwner"]);
        console.log(parseInt(result["previousPrice"]));
        console.log(parseInt(result["price"]));
        console.log(parseInt(result["numberOfTransfers"]));
        console.log(result["forSale"]);
        console.log(parseInt(result["kg"]));
        

        setAllChickenRun([ 
          parseInt(result["tokenId"]),
          result["mintedBy"],
          result["currentOwner"],
          parseInt(result["previousPrice"]),
          parseInt(result["price"]),
          parseInt(result["numberOfTransfers"]),
          result["forSale"].toString(),
          parseInt(result["kg"])
        ]);
    

      });
      
        
  }

  async function setPriceForSale(_tokenId, _newPrice, _isForSale) {


    if ( ! hasEthereum() ) {
      setConnectedWalletAddressState(`MetaMask unavailable`)
      return
    }

    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
    const contract = new ethers.Contract(process.env.CHICKEN_CONTRACT_ADDRESS, ChickenRunV4.abi, signer)
    console.log(contract)
    const transaction = await contract.setPriceForSale(_tokenId,_newPrice,_isForSale)
    await transaction.wait()

  }
  
  async function setMint(_numberOfToken) {

    if ( ! hasEthereum() ) {
      setConnectedWalletAddressState(`MetaMask unavailable`)
      return
    }

    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
    const contract = new ethers.Contract(process.env.CHICKEN_CONTRACT_ADDRESS, ChickenRunV4.abi, signer)
    console.log(contract)
    const transaction = await contract.mint(_numberOfToken)
    await transaction.wait()

  }

  function handleChangeTokenUrl(event) {
    this.setTokenURI({ value: event.target.value });
  }

  function handleChangeTotalSupply(event) {
    this.setTotalSupply({ value: event.target.value });
  }

  function inputHandler(event) {
    const enteredName = event.target.value;
    setTokenId(enteredName);
  }

  const handleClickEvent = (tokenId) => {
    getTokenURI(tokenId);
  };

  function getNFTUrl(tokenId) {
    const urlBase="https://gateway.pinata.cloud/ipfs/QmdRyyJZMxz44NiTkNJFXTQrt6r44XSAaKhKZynPNoKimg/"
    const url = urlBase + tokenId + ".png";
    setNftImageUrl(url)
    console.log(nftImageUrl)
  }

  
  const myLoader = ({ src }) => {
    return `https://gateway.pinata.cloud/ipfs/QmdRyyJZMxz44NiTkNJFXTQrt6r44XSAaKhKZynPNoKimg/${src}`
  }
  
  

  const MyImage = (props) => {
    return (

      <Image
      loader={myLoader}
      src= {`/${tokenId}.png`}
      width={200}
      height={200}
    />
    )
  }





  return (
    <section>
      <h2 className="text-4xl font-semibold mb-8">Chicken NFT Functions</h2>
      <label className="bg-green-500 text-2xl text-white">Read & Write Functions</label>
      <br />

      <div id="main" className="m-8 grid grid-cols-3 gap-1 justify-evenly">

       {/* First row:TotalSupply  */}
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={getTotalSupply}
          >
            {" "}
            TotalSupply
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

        {/* Second row:Get TokenURI  */}
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={() => handleClickEvent(tokenId)}
          >
            {" "}
            Get TokenURI
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
          <label value={tokenURI}>{tokenURI}</label>
        </div>



  {/* Fourth row:ChickenRun  */}
  <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={ () => getChickenRun(tokenId) }
          >
            Get ChickenRun with TokenId
            
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        <input
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter a tokenId"
            type="text"
          ></input>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-100">



       <label className="font-bold text-2xl">TokenId: { allChickenRun[0] }</label>
       <br/>
       <label className="font-bold text-2xl">mintedBy: { allChickenRun[1] }</label>
       <br/>
       <label className="font-bold text-2xl">currentOwner: { allChickenRun[2] }</label>
       <br/>
       <label className="font-bold text-2xl">previousPrice: { allChickenRun[3] }</label>
       <br/>
       <label className="font-bold text-2xl">price: { allChickenRun[4] }</label>
       <br/>
       <label className="font-bold text-2xl">numberOfTransfers: { allChickenRun[5] }</label>
       <br/>
       <label className="font-bold text-2xl">forSale: { allChickenRun[6] }</label>
       <br/>
       <label className="font-bold text-2xl">kg: { allChickenRun[7] }</label>
        </div>

      {/* Five row: setPriceForSale  */}
             <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={() => setPriceForSale(tokenId,price,forSale)}
          >
            Set PriceForSale
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12 space-x-10">
        <input
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter a tokenId"
            type="text"
          />
           <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter new price"
            type="text"
        />
           <input
            value={forSale}
            onChange={(e) => setForSale(e.target.value)}
            placeholder="Enter isForSale"
            type="text"
        />
    
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        </div>



         {/* Six row: Mint NFT  */}
         <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={() => setMint(numberOfToken)}
          >
            Mint NFT
          </button>
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12 space-x-10">
        <input
            value={numberOfToken}
            onChange={(e) => setNumberOfToken(e.target.value)}
            placeholder="Enter numberOfToken"
            type="text"
          />
    
    
        </div>
        <div className="bg-green-300 col-span-1 rounded-lg h-12">
        </div>


                {/* Third row: Get NFT Image */}
                <div className="bg-green-300 col-span-1 rounded-lg h-12">
          <button
            className="bg-blue-600 text-white rounded-md  text-2xl px-2 inline-flex"
            onClick={() => getNFTUrl(tokenId)}
          >
            Get NFT Image
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
    <div className="col-span-1 rounded-lg h-12 font-bold text-2xl">
  {
    tokenId ? (
      <MyImage /> 
    ):('')
  } 



 
 

    
   
    


  
        </div>


      </div>
    </section>
  );
}
