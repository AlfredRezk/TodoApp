const router = require("express").Router();

// Auth:    /api/auth
router.use("/auth", require("./auth"));
// Users:   /api/users/
router.use("/users", require("./user"));
// Categories:  /api/categories
router.use("/categories", require("./category"));
// Todos:   /api/todos
router.use("/todos", require("./todo"));
// document:
router.use('/documents', require('./document'))

module.exports = router;
