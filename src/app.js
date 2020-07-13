const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// import express from "express"; 위에 3개와 같은 것

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Client에게 보여줄려고 Backend에 콘솔을 씀
app.post("/api/test", (req, res) => {
  console.log("Server is Called by Client");
  console.log(req.body.params.inputData);

  const {
    body: {
      params: { inputData },
    },
  } = req;

  console.log(inputData);
});

app.listen(PORT, () => {
  console.log(`✅  ${PORT} Server Start`);
});
