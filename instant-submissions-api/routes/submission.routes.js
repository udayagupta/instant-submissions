const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/controller.submissions");

router.post("/submit/:formId", ctrl.createSubmission);
router.get("/submissions/:formId", ctrl.getSubmissions);

module.exports = router;