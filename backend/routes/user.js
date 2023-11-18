const router = require("express").Router();
const ctrl= require("../controllers/user");
const { protect , authorize} = require("../middlewares/auth");
const query = require('../middlewares/query');
const User = require('../models/User');
const upload = require('../middlewares/upload');

router.use(protect)
router.use( authorize('admin'))

router.route('/')
  .get(query(User), ctrl.list)
  .post(upload.single('image'), ctrl.create) 

router.route('/:id')
  .get(ctrl.read)
  .put(upload.single('image'),ctrl.update)  
  .patch(ctrl.update)
  .delete(ctrl.delete)

module.exports = router;
