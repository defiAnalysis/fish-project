import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers'
import { hasEthereum } from '../utils/ethereum'
//import Greeter from '../src/artifacts/contracts/Greeter.sol/Greeter.json'
import ChickenRunV4 from '../src/artifacts/contracts/ChickenRunV4.sol/ChickenRunV4.json'
import Chicken from '../components/chicken'
import Header from '../components/header'




export default function Home() {
  const [totalSupply, setTotalSupply] = useState('')
  const [newGreeting, setNewGreetingState] = useState('')
  const [newGreetingMessage, setNewGreetingMessageState] = useState('')
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState('')
  const newGreetingInputRef = useRef();

  // If wallet is already connected...
  useEffect( () => {
    if(! hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`)
      return
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      try {
        const signerAddress = await signer.getAddress()
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
      } catch {
        setConnectedWalletAddressState('No wallet connected')
        return;
      }
    }
    setConnectedWalletAddress();
  },[])
  
  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' } )
  }

   // Call smart contract, set new value
   async function setGreeting() {
 
    if ( ! hasEthereum() ) {
      setConnectedWalletAddressState(`MetaMask unavailable`)
      return
    }
 
 
    console.log("set3...")
    await requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`)
    const contract = new ethers.Contract(process.env.CHICKEN_CONTRACT_ADDRESS, ChickenRunV4.abi, signer)
    const transaction = await contract.mint(1)
    await transaction.wait()
    //setNewGreetingMessageState(`Greeting updated to ${newGreeting} from ${greeting}.`)
    //newGreetingInputRef.current.value = ''
    //setNewGreetingState('')
  }

  // Call smart contract, fetch current value
  async function fetchGreeting() {
    if ( ! hasEthereum() ) {
      setConnectedWalletAddressState(`MetaMask unavailable`)
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(process.env.CHICKEN_CONTRACT_ADDRESS, ChickenRunV4.abi, provider)
    console.log(contract)
    try {
      //const mintAction =  await contract.mint(1);
      const data = await contract.totalSupply();
      setTotalSupply(data)
    } catch(error) {
      console.log(error)
    }
  }


 

  return (
   <Header />
  )
}
