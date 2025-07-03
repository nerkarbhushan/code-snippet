const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5003;

const snippets = {};

app.get("/snippets", (req, res) => {
  return res.status(200).json(snippets);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "snippetCreated") {
    const { id, title } = data;
    snippets[id] = { id, title, comments: [] };
  }
  if (type === "commentAdded") {
    const { id, content, snippetId } = data;
    console.log(id, content, snippetId);
    snippets[snippetId].comments.push({ id, content });
  }

  return res.status(200).json({});
});

app.listen(PORT, () => {
  console.log(`query-service server running on PORT - ${PORT}`);
});
