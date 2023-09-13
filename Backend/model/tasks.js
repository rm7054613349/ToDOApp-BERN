const {contract}=require('../contract/contract')


const dateclashCheck=async(taskDate)=>{
    const tasks = await contract.methods.allTask().call();
    const foundTask = tasks.find(task=>task.date===taskDate);

    if(foundTask){
        return foundTask.name;
    }
    return "No Task Found";
}

const priorityCheck = async(id)=>{
    const tasks = await contract.methods.allTask().call();

    //iska matlab yadi apke task me yadi preority include hai then hme task delete nhi krna hai ye normally ak condition de diya ap kuchh bhi de skte hai
    const result = tasks[id-1].name.includes("priority")
    return result;
}
module.exports={dateclashCheck,priorityCheck}