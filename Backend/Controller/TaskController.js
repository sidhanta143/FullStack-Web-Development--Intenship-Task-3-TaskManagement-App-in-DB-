const TaskModel = require("../models/TaskModel");

const createTask=async(req,res)=>{
    const data=req.body;
    try{
        const model=new TaskModel(data);
        await model.save();
        res.status(201)
        .json({message:"Task is Created..",success:true});
    }catch(err){
        res.status(500).json({message:'failed to create task',success:false});
    }

}
const fetchAllTask=async(req,res)=>{
   try{
        const data=await TaskModel.find({});
        
        res.status(201)
        .json({message:"All Tasks..",success:true,data});
    }catch(err){
        res.status(500).json({message:'failed to create task',success:false});
    }

}


const updatedTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const data = await TaskModel.findByIdAndUpdate(
            id,                 
            { $set: body },     
            { new: true }       
        );

        res.status(200).json({
            message: "The task updated..",
            success: true,
            data
        });

    } catch (err) {
        res.status(500).json({
            message: 'failed to update task',
            success: false
        });
    }
}
const delectTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        // const body = req.body;

        await TaskModel.findByIdAndDelete(
            id               
            // { $set: body },     
            // { new: true }       
        );

        res.status(200).json({
            message: "The task delected..",
            success: true,
            
        });

    } catch (err) {
        res.status(500).json({
            message: 'failed to delected task',
            success: false
        });
    }
}

module.exports={
    createTask,
    fetchAllTask,
    updatedTaskById,
    delectTaskById
}