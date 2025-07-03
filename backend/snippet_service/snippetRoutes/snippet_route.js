const express = require("express");
const {
  createSnippet,
  getSnippet,
} = require("../snippetControllers/snippet_controller.js");
const router = express.Router();

router.post("/", createSnippet);
router.get("/", getSnippet);

module.exports = router;
