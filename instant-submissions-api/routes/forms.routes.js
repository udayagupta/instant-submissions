const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/controller.forms");

router.post("/createForm", ctrl.createForm);
router.get("/forms", ctrl.getForms);

module.exports = router;
