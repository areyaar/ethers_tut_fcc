const ethers = require("ethers"); // importing ethers.js
const fs = require("fs");// file system to read different files
async function main(){
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545"); // provider helps us connect to blockchain
    const wallet = new ethers.Wallet("0x598d86fe57dece8a7eb665e7a6c879bb2b54e0e003aecd8286e8c66d62492473", provider); 
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying please wait!");
    //const contract = await contractFactory.deploy();
    //console.log(contract); // console me whatever we see is the transaction data, because we are actually just carrying out transactions
    //we can actually create a contract ourselves just by actually specifying the transaction data
    //let's deploy simplestorage by only using transaction data
    const tx={
        nonce: 16, //number of transactions in ganache+1 -> num that is not used, to be used only once
        gasPrice: 20000000000, //ganache ka uthake likh dia
        gasLimit: 6721975,
        to: null, // just like the above contract, console me print hoke aata tha ye null
        value: 0, // we are not sending any eth
        data: "0x608060405234801561001057600080fd5b50610263806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80633a9ebefd1461005157806360fe47b11461006d5780636d4ce63c146100895780637cf5dab0146100a7575b600080fd5b61006b6004803603810190610066919061013f565b6100c3565b005b6100876004803603810190610082919061013f565b6100da565b005b6100916100e4565b60405161009e919061017b565b60405180910390f35b6100c160048036038101906100bc919061013f565b6100ed565b005b806000546100d191906101c5565b60008190555050565b8060008190555050565b60008054905090565b806000546100fb91906101f9565b60008190555050565b600080fd5b6000819050919050565b61011c81610109565b811461012757600080fd5b50565b60008135905061013981610113565b92915050565b60006020828403121561015557610154610104565b5b60006101638482850161012a565b91505092915050565b61017581610109565b82525050565b6000602082019050610190600083018461016c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101d082610109565b91506101db83610109565b92508282039050818111156101f3576101f2610196565b5b92915050565b600061020482610109565b915061020f83610109565b925082820190508082111561022757610226610196565b5b9291505056fea264697066735822122046476125996e5ae6502b6b6fe9acc88b501b53c4a5d19f8a45782e48a3881c4764736f6c63430008130033",
        // data is the binary data in the folder .bin
        chainId: 1337 // ganche ka network id, maybe 31337 ho chainId, but usually they are same
        //ab signature bachi

    };
    // const signedTxResponse = await wallet.signTransaction(tx);
    // console.log(signedTxResponse); //ouputs a hash kinda thing, abhi sirf sign hua hai, transaction send krna bakoi hai bhay

    const sentTxResponse = await wallet.sendTransaction(tx);
    await sentTxResponse.wait(1); // sending the tx after signing it and waiting for 1 block confirmation
    //abhi underpriced error aara idk why, lets move on

}

main()
    .then(()=> process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    });