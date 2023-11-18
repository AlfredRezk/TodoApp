const router = require("express").Router();
const ctrl= require("../controllers/Todo");
const { protect, authorize} = require("../middlewares/auth");
const query = require('../middlewares/query');
const Todo = require('../models/Todo');



router.route('/')
  .get(query(Todo, 'userId categoryId'), ctrl.list)
  .post(protect, ctrl.create) 

router.route('/:id')
  .get(protect, ctrl.read)
  .put(protect, ctrl.update)  
  .patch(protect, ctrl.update)
  .delete(protect, ctrl.delete)

module.exports = router;
