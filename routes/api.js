var express = require("express");
var router = express.Router();

// 原本接收前端資料暫存在後端的一個變數中
// 修改為透過後端儲存至MongoDB

// 引入models/listModel.js作為資料庫模組，並存在變數listModel中
var listModel = require("../models/listModel.js");

router.post("/addList", function (req, res) {
  var newlist = new listModel({
    title: req.body.title,
    content: req.body.content,
    status: false,
  });
  newlist.save(function (err, data) {
    if (err) {
      res.json({ status: 1, msg: "error" });
      console.log("add error");
    } else {
      res.json({ status: 0, msg: "success", data: data });
      console.log("add success");
    }
  });
});

router.get("/getList", function (req, res) {
  listModel.find(function (err, data) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
});

// 建立修改代辦清單API的路由及方法
router.post("/updateList", function (req, res) {
  var id = req.body.id;
  var index = listModel.findIndex((item) => item._id == id);
  listModel[index].title = req.body.title;
  listModel[index].content = req.body.content;
  res.json({ status: 0, msg: "success" });
});

router.post("/removeList", function (req, res) {
  var id = req.body.id;
  var index = listModel.findIndex((item) => item._id == id);
  // 從index位置刪除1個元素
  listModel.splice(index, 1);
  res.json({ status: 0, msg: "success" });
});

router.post("/changeStatus", function (req, res) {
  var id = req.body.id;
  var index = listModel.findIndex((item) => item._id == id);

  if (listModel[index]["status"]) {
    listModel[index]["status"] = false;
  } else {
    listModel[index]["status"] = true;
  }
  res.json({ status: 0, msg: "success" });
});

module.exports = router;
