const { randomBytes } = require("crypto");
const { commentsDB } = require("../commentsDatabase/index.js");
const axios = require("axios");

const addCommentToSnippet = async (req, res) => {
  const snippetId = req.params.id;
  const { text } = req.body;
  const commentId = randomBytes(4).toString("hex");
  const comments = commentsDB[snippetId] || [];

  //   Add the new comment
  comments.push({ commentId, text });

  // Store the comments back in the database
  commentsDB[snippetId] = comments;

  // publish event
  await axios.post("http://localhost:5005/events", {
    type: "commentAdded",
    data: {
      id: commentId,
      content: text,
      snippetId,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Comment added",
    comment: { commentId, text },
  });
};

const getcommentsBySnippet = (req, res) => {
  const snippetId = req.params.id;

  return res.status(200).json(commentsDB[snippetId] || []);
};

module.exports = { addCommentToSnippet, getcommentsBySnippet };
