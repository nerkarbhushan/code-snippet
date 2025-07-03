const express = require("express");
const cors = require("cors");
const comment_route = require("./commentRoutes/comment_route.js");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5002;

app.post("/events", (req, res) => {
  console.log("Event received -", req.body.type);
  return res.status(200).json({});
});

app.use("/api/v1/snippet", comment_route);

//http://localhost:5002/api/v1/snippet/:id/comment

app.listen(PORT, () => {
  console.log(`comment-service server is running on PORT - ${PORT}`);
});
