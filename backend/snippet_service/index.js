const express = require("express");
const cors = require("cors");
const snippet_route = require("./snippetRoutes/snippet_route.js");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5001;

app.post("/events", (req, res) => {
  console.log("Event received -", req.body.type);
  return res.status(200).json({});
});

app.use("/api/v1/snippet", snippet_route);

//http://localhost:5001/api/v1/snippet

app.listen(PORT, () => {
  console.log(`snippet-service server is running on PORT - ${PORT}`);
});
