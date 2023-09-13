//ye hmne isliye kiya taki ham contract ka insetance la paye and server contract se intract kre using Web3.js

const {Web3}= require("web3");
const ABI = require("../ABI.json");

////jab ham alchmy me ak project create krenge and useke bad api per jayenge to ak http ki link rhegi vo yha use hoga 
const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/oEdUr128WiDvUgH-Z3xYFz-sTZeYYd0q")

//ye hmara contract address hai jis address se hmara smart contract deploy hua hai uski transation history me to ka data
const contractAddress = "0xb9bd4182bc1a379baf8d879a738f254066df56c1";

// ye krne ke bad hmara contract ka insetance a jaiyega iske bad ham contract se Intract krr payege
const contract = new web3.eth.Contract(ABI,contractAddress);

module.exports={contract}
