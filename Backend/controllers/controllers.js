const {dateclashCheck,priorityCheck}=require('../model/tasks')
const {contract}=require('../contract/contract')

//ye hmare Write Task hai to hme 
const createTask=async(req,res)=>{
    const {taskDate}=req.body; 
    const task = await dateclashCheck(taskDate);
    try{
        if(task!=="No Task Found"){
            res.status(409).json({status:409,message:"Date clash:Task cannot be added"})
        }else{
            res.status(200).json({status:200,message:"Task can be added"})
        }
    }catch(error){
        console.error(error)
    }
}


//ye bhi hmare write opration hai
const updateTask=async(req,res)=>{
    const {taskDate}=req.body; 
    const task = await dateclashCheck(taskDate);
    try{
      if(task!=="No Task Found"){
         res.status(409).json({status:409,message:"Date clash:Task cannot be updated"})
      }else{
         res.status(200).json({status:200,message:"Task can be updated"})
      }
    }catch(error){
     console.error(error)
    }
}



const deleteTask=async(req,res)=>{
    try{
        const {taskId}=req.params;
        const isTrue = await priorityCheck(taskId);
        if(isTrue){
          res.status(403).json({status:403,message:"Task cannot be deleted"})
        }else{
          res.status(200).json({status:200,message:"Task can be deleted"})
        }
      }catch(error){
        console.error(error)
      }
}



const viewTask=async(req,res)=>{
    try{
        const {taskId}=req.params;
        console.log(taskId)

        //iss trah ham contract se Intract krte hai
        const task = await contract.methods.viewTask(taskId).call();
        const{id,name,date}=task;

        //    const numId = Number(id); Ye hmne isliye kiya hai taki ham bigINT ko number me convert krr paye kyuki hamara o/p BigInT me ayega like id=1n  to hme ye krna pdega vrna error de dega
        //Ye Besically BigINT ko number me convert krr rha hai
        const numId = Number(id);

        //hmne sara data ak object ke form me store krr liya taki isse further use krr paye
        const taskObj={
            numId,name,date
        }

        //client ko response send krne ke liye ham ye krte hai  taskObj ye as a responce jayeg and ham ise client per easly access krr skte hai
        res.status(200).json({status:200,taskObj,message:"Task Exist"})
    }catch(error){
        res.status(404).json({status:500,message:"Task does not exist"})
        console.error(error)
    }
}


const allTasks=async(req,res)=>{
    try{
        const tasks = await contract.methods.allTask().call();
        if(tasks.length<0){
            res.status(404).json({status:404,message:"Task list does not exist"})
        }
        else
        {
            //kyuki koi ak single task to hoga nhi isliye mane map ka use kiya hay
            const taskList = tasks.map(({id,name,date})=>{
               const taskId=Number(id);
               return {taskId,name,date}
            })
            res.status(200).json({status:200,taskList,message:"Task Exist"})
        }
    }
    catch(error)
    {
        console.error(error)
    }
}


module.exports={
    createTask,
    updateTask,
    deleteTask,
    viewTask,
    allTasks
}