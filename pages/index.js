import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState, useRef } from 'react'
import { ethers } from 'ethers'
import { hasEthereum } from '../utils/ethereum'
import Greeter from '../src/artifacts/contracts/Greeter.sol/Greeter.json'

export default function Home() {

  const [greeting, setGreetingState] = useState('')
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


    async function fetchGreeting() {
      if ( ! hasEthereum() ) {
        setConnectedWalletAddressState(`MetaMask unavailable`)
        return
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log(provider)
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_GREETER_ADDRESS, Greeter.abi, provider)
      console.log(contract)
      try {
        const data = await contract.greet()
        console.log(data)
        setGreetingState(data)
      } catch(error) {
        console.log(error)
      }
    }




   // fetchGreeting().then(result => result)

  return (
    <div className={styles.container}>
    <br/>
    <br/>
    <button onClick={fetchGreeting}>GetGreeting</button>
    <br/>
    <br/>
    <label>{greeting}</label>
    </div>
  )
}
