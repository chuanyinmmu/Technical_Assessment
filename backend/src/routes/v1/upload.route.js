const express = require("express");
const controller = require("../../controllers/upload.controller");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/").post(upload.single("theCSV"), controller.updateFile);

module.exports = router;
