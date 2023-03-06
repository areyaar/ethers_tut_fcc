const ethers = require("ethers"); // importing ethers.js
const fs = require("fs");// file system to read different files
require("dotenv").config(); // require krna pdta hai
// .env use krne k liye node package is used -> dotenv
// .env file k andar private key ko quotes k andar rakho na rakho koi bt nahi
// also we dont need to use comma to separate different data in .env
// just doosre line pe de do wo data
// npm run compile
/// upar ka code will compile the contract and create the .bin and .abi files to be use later
// compile command package.json me set kare hai
async function main(){
    //okay now we know how to deploy, we need to know how to actually interact with these contracts

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC); // provider helps us connect to blockchain

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); 
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);

    // the contract object comes with all the functions mentioned in the abi of the contract
    // so to interact with the contract we call the functions in the contract using the contract object
    
    let num = await contract.get(); //this will call the get fn of the contract
    // console.log(num); // returns BigNumber { _hex: '0x01', _isBigNumber: true } -> when storageData = 1
    // this call wont cost any gas because it is not being called by a contract and it is a view fn
    // bignumber is a library which comes with the ethers, helps us work with numbers
    // why not directly use numbers? because solidity cant use decimals and Js has a hard time with decimals
    // javascript me ek bada number pass karo toh iski fatt jati hai, toh we pass a string form of that number

    // we can get a string return of the value like this
    //console.log(num.toString()); // will return the number in string
    console.log(`Current number: ${num.toString()}`); // looks better

    const txResponse = await contract.set("7"); // isko just as a number bhi rakh sakte, but humne string me pass kia hai to handle large numbers
    const txReceipt = await txResponse.wait(1);
    num = await contract.get();

    console.log(num.toString());
    // isme ek baar node deploy call krne pe pehle ek naya smart contract deploy hota hai
    // isi liye value set krne ke baad next call pe firse 0 dikhata hai!

    //console.log(txResponse);


}

main()
    .then(()=> process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    });