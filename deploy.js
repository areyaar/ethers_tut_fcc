const ethers = require("ethers"); // importing ethers.js
const fs = require("fs");// file system to read different files
async function main(){
   // is fn ke andar se hi sab hoga jo hona hai 
   // ganache me RPC http://127.0.0.1:7545 hai
   // so we have to connect to this rpc

   const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545"); // provider helps us connect to blockchain

   const wallet = new ethers.Wallet("0x574b28ace2453c581802d28ba223266f47c8feed05f0bed0ba61e8bb6b36e53a",
        provider); // isse we are getting hold of a wallet -> private key is of ganache
    // ideal to use .env here for private key
    // wallet is to be used for signing transactions
    // we need to get hold of the abi and the binary code to interact with the smart contract
    // toh .abi and .bin files jo compile karne pe bani that we have to use
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    
    // now that we have the abi and the binary, we can create a contract factory
    // it is an object used to deploy contracts
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying please wait!");
    const contract = await contractFactory.deploy();
    // deploy ke andar we can specify things to be done while deploying
    // eg deploy({gasPrice: 1000000}) -> this contract will be deployed with gasPrice this
    console.log(contract);
    // what if we wanna wait one block ka confirmation before aything to  make sure it is in the blockchain
    // deployment receipts
    // const transactionReceipt = await contract.deployTransaction.wait(1); //it will wait one block before returning anything
    // console.log("here is the deployment transaction");
    // console.log(contract.deployTransaction);
    // console.log("here it the transaction receipt"); // we will only get this if we wait for a block confirmation
    // console.log(transactionReceipt);
// next is deploy1 sending raw data lecture se



}

main()
    .then(()=> process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    });