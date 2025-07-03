const { snippets } = require("../snippetDatabase/index.js");
const { randomBytes } = require("crypto");
const axios = require("axios");

const createSnippet = async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title, code } = req.body;

  // creating a snippet
  snippets[id] = {
    id,
    title,
    code,
  };

  // publish event
  await axios.post("http://localhost:5005/events", {
    type: "snippetCreated",
    data: {
      id,
      title,
    },
  });

  return res.status(201).json({
    success: true,
    snippet: snippets[id],
    message: "snippet created successfully",
  });
};

const getSnippet = (req, res) => {
  return res.status(200).json(snippets);
};

module.exports = { createSnippet, getSnippet };
