const express = require("express");
const {
  addCommentToSnippet,
  getcommentsBySnippet,
} = require("../commentControllers/comment_controller.js");
const router = express.Router();

router.post("/:id/comment", addCommentToSnippet);
router.get("/:id/comment", getcommentsBySnippet);

module.exports = router;
