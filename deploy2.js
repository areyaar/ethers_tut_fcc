const ethers = require("ethers"); // importing ethers.js
const fs = require("fs");// file system to read different files
async function main(){
    //okay now we know how to deploy, we need to know how to actually interact with these contracts

    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545"); // provider helps us connect to blockchain

    const wallet = new ethers.Wallet("0x574b28ace2453c581802d28ba223266f47c8feed05f0bed0ba61e8bb6b36e53a", provider); 
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying please wait!");
    const contract = await contractFactory.deploy();
    console.log(contract);
    

}

main()
    .then(()=> process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    });