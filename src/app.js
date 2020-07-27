const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firestore = require("./firebase");
const { response, request } = require("express");
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

  let sendData = [];

  try {
    await firestore // firestore 접근
      .collection("Memo")
      .get()
      .then((response) =>
        response.forEach((doc) =>
          sendData.push({
            refKey: doc.id, // doc이 갖고있는 refkey
            title: doc.data().title, // doc이 갖고있는 title
            content: doc.data().content, // doc이 갖고있는 content
            regDate: doc.data().regDate, // doc이 갖고있는 regDate
          })
        )
      ); // response가 3개면 push 에서도 3개, response가 4개면 push 에서도 4개 받아온다.
  } catch (e) {
    console.log(e);
  }

  return res.json(sendData);
});

app.post("/api/memoUploadHandler", async (req, res) => {
  const {
    body: {
      params: { inputData },
    },
  } = req;

  const D = new Date();

  let year = D.getFullYear();
  let month = D.getMonth() + 1;
  let date = D.getDate();

  month = month < 10 ? "0" + month : month;
  date = date < 10 ? "0" + date : date;

  const resultDate = year + month + date;

  let resultCode = 0;

  try {
    await firestore.collection("Memo").add({
      title: inputData.input_title,
      content: inputData.input_desc,
      regDate: resultDate,
    });
    resultCode = 1;
  } catch (e) {
    console.log(e);
  }

  return res.json(resultCode);
});

app.listen(PORT, () => {
  console.log(`✅  ${PORT} Server Start`);
});
