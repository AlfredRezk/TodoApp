const router = require("express").Router();
const ctrl= require("../controllers/category");
const { authorize, protect} = require("../middlewares/auth");
const query = require('../middlewares/query');
const Category = require('../models/Category');

router.use(protect)
router.use( authorize('admin'))

router.route('/')
  .get(query(Category), ctrl.list)
  .post(ctrl.create) 

router.route('/:id')
  .get(ctrl.read)
  .put(ctrl.update)  
  .patch(ctrl.update)
  .delete(ctrl.delete)

module.exports = router;
