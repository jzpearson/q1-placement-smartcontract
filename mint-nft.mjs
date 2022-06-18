import { NFTStorage, File } from 'nft.storage'
import * as fs from "fs/promises"
import 'dotenv/config'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import contract from "./artifacts/contracts/MyNFT.sol/MyNFT.json" assert {type: "json"}

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.NFT_STORAGE_API_KEY;

// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// const contract = import("./artifacts/contracts/MyNFT.sol/MyNFT.json");
const contractAddress = "0x8ca0d9b3dcb8fc54b68488f86fde2ae2cdef4fec";
//Contract that you want to mint with
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


async function mintNFT(tokenURI) {
    //Mints the NFT using contractAddress
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  
    //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'maxPriorityFeePerGas': 2999999987,
      'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}
  

async function getImage(filename){
  // Gets image from computer
  const content = await fs.readFile(filename)
  const f = new File([content], filename, {type: "image/png"})
  return f
}


async function storeExampleNFT(filename) {
  // Stores image on IPFS
  
    const image = await getImage(filename)
    const nft = {
      image, // use image Blob as `image` field
      name: "Testing nft.storage",
      description: "For the completion of \"Introduction to Programming\" mini course",
      properties: {
        instute: "Griffith",
        course: "Introduction to Programming"
      }
    }
  
    const client = new NFTStorage({ token: API_KEY })
    const metadata = await client.store(nft)
  
    console.log('NFT data stored!')
    console.log('Metadata URI: ', metadata.url)

    return metadata.url
}


async function main(){
  const filename = process.argv[2]
  console.log("Storing ", filename)
  console.log("api key is", API_KEY)
  const IPFS_URL = await storeExampleNFT(filename)
  console.log("Uploading to blockchain")
  mintNFT(IPFS_URL)

}

main()

// mintNFT("https://gateway.pinata.cloud/ipfs/QmScssrf4yMA4CaeDotuYGWVaGMysQ268XKZmSWZQCeoFL");