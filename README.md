# q1-placement-smartcontract
Smart contract and project plan for q1 placement

===========================================
Explanation of files and functions

.env
The environment variables needed for this are:
API_URL  = this is the app URL from your alchemy project
PRIVATE_KEY = this is your private metamask key
PUBLIC_KEY = this is your public metamask key
NFT_STORAGE_API_KEY = this is your api key for nft.storage that you must create

mint-nft.mjs

This file holds a function that uploads the image to the IPFS via NFT.storage and mints the NFT with an ERC-721 smart contract. It uses all the environment variables. Run the file with the second argument being the location of the image that you want to mint. Update contractAddress to be your contract address obtained from deploying smart contract.

hardhat.config.js
Specifies what network we are working on, and in this case it’s ropsten network.

contracts/MyNFT.sol
Smart contract based on OpenZeppelin library’s ERC721 implementation.

scripts/deploy.js
Deploys the smart contract in contracts folder

Scripts/mint-nft-json-ready
Mints NFTs if the file is already on the IPFS

===========================================
Packages used

Hardhat
Used to compile, deploy, test and debug ethereal software
To download   npm install --save-dev hardhat
To create hardhat project  nix hardhat

Dotenv
To store environment variables
To download  npm install dotenv --save

NFT.storage
To store files on IPFS via nft.storage
To download npm install nft.storage

Alchemy Web3
To interact with an alchemy app
To download npm stall @alch/alchemy-web3







