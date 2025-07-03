const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5005;

app.post("/events", (req, res) => {
  const events = req.body;
  axios.post("http://localhost:5001/events", events); // snippet server
  axios.post("http://localhost:5002/events", events); // comment server
  axios.post("http://localhost:5003/events", events); // query server

  return res.status(200).json({});
});

app.listen(PORT, () => {
  console.log(`message-broker server running on PORT - ${PORT}`);
});
