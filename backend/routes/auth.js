const ctrl= require("../controllers/auth");
const { protect } = require("../middlewares/auth");
const upload = require('../middlewares/upload');
const router = require("express").Router();

router.post("/register", upload.single('image'), ctrl.register); 
router.post("/login", ctrl.login);
router.get('/verify', ctrl.verify)
router.get("/profile", protect, ctrl.profile);
router.get("/logout", protect, ctrl.logout);
router.post("/forgotpassword", ctrl.forgot);
router.put("/resetpassword/:resetToken", ctrl.reset);
router.patch("/resetpassword/:resetToken", ctrl.reset);
router.put("/update", upload.single('image'), protect, ctrl.update); //upload
router.patch("/update", upload.single('image'), protect, ctrl.update);
router.put("/updatepassword", protect, ctrl.updatePassword);
router.patch("/updatepassword", protect, ctrl.updatePassword);




module.exports = router;