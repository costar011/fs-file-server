const firebase = require("firebase/app"); // 빈 객체
require("firebase/firestore");

//  fsConfig를 만들고 제이슨으로 만듬
const fsConfig = {
  apiKey: "AIzaSyBUvgRPT9jHc29-gD31OM9PqEQq7Iqxl-o",
  authDomain: "file-memo-3d16b.firebaseapp.com",
  databaseURL: "https://file-memo-3d16b.firebaseio.com",
  projectId: "file-memo-3d16b",
  storageBucket: "file-memo-3d16b.appspot.com",
  messagingSenderId: "127940145639",
  appId: "1:127940145639:web:84a54e104588191388cd42",
  measurementId: "G-C5WJDPXGEX",
};

firebase.initializeApp(fsConfig); // 초기화 시킴 ( 초기화는 아예 삭제한다는 것이 아님 )

const firestore = new firebase.firestore();

module.exports = firestore;
