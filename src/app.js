const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firestore = require("./firebase");
const { response } = require("express");
// import express from "express"; 위에 3개와 같은 것

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Client에게 보여줄려고 Backend에 콘솔을 씀
app.post("/api/test", async (req, res) => {
  console.log("Server is Called by Client");
  console.log(req.body.params.inputData);

  const {
    body: {
      params: { inputData },
    },
  } = req;

  try {
    await firestore
      .collection("Memo")
      .get()
      .then((response) =>
        response.forEach((doc) => {
          console.log(doc.data().title);
          console.log(doc.data().content);
          console.log("=======================");
        })
      );
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`✅  ${PORT} Server Start`);
});
