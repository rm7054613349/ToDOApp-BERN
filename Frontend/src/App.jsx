import {useState} from "react";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import CreateTask from './pages/CreateTask'
import Wallet from './pages/Wallet'
import ViewAllTasks from './pages/ViewAllTasks'
import UpdateTask from './pages/UpdateTask'
import ViewTask from './pages/ViewTask'
// import DeleteTask from './pages/DeleteTask';

import './App.css'

function App() {
  const [state,setState]=useState({web3:null,contract:null,account:null})
  
  const saveState=({web3,contract,account})=>{
    setState({web3:web3,contract:contract,account:account})
  }
  const router = createBrowserRouter([

     //isme hmne save state ko as a props pass kiya hai wallete me kyuki vahi per sari details like web3,contract,account hai to uska data hme yha lana hai so we are use props fn 
    {path:'/',element:<Wallet saveState={saveState}/>},

    {path:'/view-all-tasks',element:<ViewAllTasks/>},

    //jha bhi write opration krna tha wha hmne state pass kiya hai usestate ki latest value kyuki in sab me ye value use hogi
    {path:'/create-task',element:<CreateTask state={state}/>},
    {path:'/view-task',element:<ViewTask/>},
    {path:'/update-task',element:<UpdateTask state={state}/>},
    // {path:'/delete-task',element:<DeleteTask state={state}/>}
  ])

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
