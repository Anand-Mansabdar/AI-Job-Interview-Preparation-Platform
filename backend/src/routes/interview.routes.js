const { Router } = require("express");
const { userAuthMiddleware } = require("../middlewares/auth.middleware");
const { generateReport } = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const router = Router();

/**
 * @route POST /api/interview
 * @description Generate new interview report on the basis of user self description, resume pdf and job description
 * @access private
 */
router.post("/", userAuthMiddleware, upload.single("resume"), generateReport);

module.exports = router;
