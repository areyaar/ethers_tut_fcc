const ethers = require("ethers"); // importing ethers.js
const fs = require("fs");// file system to read different files
require("dotenv").config(); // require krna pdta hai
async function main(){
// now we have .env file containing our private key in plain sight without any security
// we can encrypt it  -> alas ari
// so for now, we decide to never place a private key associated with real funds in the .env
// only wallets with testETH will be used here
// now we will deploy this to a testnet, goerli
// rpc me infura se link nikala, and api key me metamask se private key nikala
// and .env me dal dia

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC); // our rpc could be some private api endpoint hence we put it in .env
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); 
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    
    const contract = await contractFactory.deploy(); // name of deployed contract object - contract
    await contract.deployTransaction.wait(1);
    
    let num = await contract.get(); // returns BigNumber
    console.log(`Current number: ${num.toString()}`);

    const txResponse = await contract.set("7"); // string and number both will work
    const txReceipt = await txResponse.wait(1);
    num = await contract.get();
    //console.log(contract.address);
    console.log(num.toString());

    // ye sab kar lia, metamask hack krwa lia, 
    // isme apan purely ethers se deploy krke dekh liye, but ye sab manually kia apan ne, and we didn't acutally do a lot of things
    // jaise saving where the contract was deplyed and this that
    // ab we want something robust to do these things for us 
    // we will now move on to using hardhat
    // iske baad ka hardhat simple storage wale repo me hai code
    
    
}

main()
    .then(()=> process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    });