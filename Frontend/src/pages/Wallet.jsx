

//write opration or yadi hme transaction krna hai then hame metamask se connection krna pdega and ham isis trah connection krte hai


import PropTypes from 'prop-types';


import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import ABI from "./ABI.json"
const Wallet =({saveState})=>{
    const navigateTo =useNavigate();
    const connectWallet =async()=>{
       try
       {
          //hme metamask use krne ke liye window.etherreum ka use krna pdega yhi hmare metamask ko inject krta hai browser me taki ham metamask se deal krr ske

           //isse ham metamask se connect ho jayenge
          if(window.ethereum){
              const web3 = new Web3(window.ethereum);

              //ye hme array of account dega
              const accounts = await window.ethereum.request({
                method:"eth_requestAccounts"
              })


             //ye hmara contract address hai jis address se hmara smart contract deploy hua hai uski transation history me to ka data
             const contractAddress = "0xb9bd4182bc1a379baf8d879a738f254066df56c1";



              //create a  contract instance for smart contract se intract krne ke liye jaise hi hmara contract ka insetance bnega vaise hi hmare pass sara data method contract ka a jayega jo ham use krenge
              const contract = new web3.eth.Contract(ABI,contractAddress);

              saveState({web3:web3,contract:contract,account:accounts[0]})
               //jai hi hmara data save state me a jaye vaise hi ham view all task per land krr jaye
              //iske thru ham kisi bhi componenet per ja skte hai
              navigateTo("/view-all-tasks")
          }else{
            throw new Error
          }
       }catch(error){
          console.error(error)
       }
    }

    return(
      <>
        <div className="wallet_header ">
          <span>WELCOME TO</span> <p>TODO 3.0</p>
        </div>
        <div className="connect_wallet_section todo_btn">
          <p> Please connect metamask wallet to access the app </p>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </>
    );
}


Wallet.propTypes = {
    saveState: PropTypes.func.isRequired,
  };
  
export default Wallet;




