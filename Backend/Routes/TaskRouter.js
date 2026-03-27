const {createTask,fetchAllTask,updatedTaskById,delectTaskById}=require('../Controller/TaskController');

const router=require('express').Router();

router.get('/',fetchAllTask);

// to created a task..

router.post('/',createTask);
// to updated task..
router.put('/:id',updatedTaskById);
// To delect task..
router.delete('/:id',delectTaskById);

module.exports=router;