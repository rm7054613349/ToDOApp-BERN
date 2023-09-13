// SPDX-License-Identifier: Unlicensed
//in smart contract we are create all todo task
pragma solidity >=0.7.0;

contract ToDo{

    struct Task{
        uint id;
        string name;
        string date;
    }

    address owner;
    Task task;
    mapping(uint=>Task) tasks;//view task ...map isliye bnaya hai taki ham list of all task rakh paye
    uint taskId=1;
    event taskCreate(uint taskId, string name);
    event taskUpdate(uint taskId, string name);
    event taskDelete(uint taskId);

    modifier checkId(uint id){
        require(id!=0 && id<taskId,"Invalid Id");
        _;
    }
    modifier onlyOwner(){
        require(msg.sender==owner,"Invalid Owner");
        _;
    }

    constructor(){
        owner=msg.sender;
    }

    function createTask(string calldata _taskName, string calldata _date) public { 
          tasks[taskId]=Task(taskId,_taskName,_date);
          taskId++;
          emit taskCreate(taskId,_taskName);
    }

    function updateTask(uint _taskId,string calldata _taskName, string calldata _date) checkId(_taskId) public {
        tasks[_taskId] = Task(_taskId,_taskName,_date);
        emit taskUpdate(taskId,_taskName);
    }

    function allTask() public view returns(Task[] memory){
        Task[] memory taskList = new Task[](taskId-1);
        for(uint i=0;i<taskId-1;i++)
        {
            //ham log yha list of task jo map me hai use array me store krr rhe hai kyuki hme all task chahiye and ham direct map of list return nhi krr skte hai isme isliye array me store krr ehe hai....ham map kis single value return kra skte hai
            taskList[i]=tasks[i+1];
        }
        return taskList;
    }

    function viewTask(uint _taskId) checkId(_taskId) public view returns(Task memory){
        return tasks[_taskId];
    }

    function deleteTask(uint _taskId) checkId(_taskId) public
     {
        //smart contract me ak delete keyword hota hai jiski help se ham kuchh delete kr dega ....jaise hi ham delete krenge vaise hi map me kyuki sari value map me hi hai uski key 0 and value " " empty string ho jayega
        delete tasks[_taskId];
        emit taskDelete(_taskId);
    }
}






//0x0679518fcf19d7e7094edc5c3aac5989bbf5cf78  ye contract address hai ye use hoga  jab ham deploy krenge to ak address gerate hoga meta mask ke thru ether.scn per to wala address vo use hoga deploy time apka metamask se connect ho remix
 