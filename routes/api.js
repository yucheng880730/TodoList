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
  // 前端傳來代辦項目id
  var id = req.body.id;
  listModel.findById(id, function (err, data) {
    if (err) {
      console.log(err);
      res.json({ status: 1, msg: "error" });
    } else {
      data.title = req.body.title;
      data.content = req.body.content;
      data.save(function (err) {
        if (err) {
          console.log(err);
          res.json({ status: 1, msg: "error" });
        } else {
          res.json({ status: 0, msg: "success" });
        }
      });
    }
  });
});

router.post("/removeList", function (req, res) {
  var id = req.body.id;
  listModel.remove({ _id: id }, function (err, data) {
    if (err) {
      console.log(err);
      res.json({ status: 1, msg: "error" });
    } else {
      res.json({ status: 0, msg: "success" });
    }
  });
});

router.post("/changeStatus", function (req, res) {
  var id = req.body.id;
  listModel.findById(id, function (err, data) {
    if (err) {
      console.log(err);
      res.json({ status: 1, msg: "error" });
    } else {
      if (data.status) {
        data.status = false;
      } else {
        data.status = true;
      }
      data.save(function (err) {
        if (err) {
          console.log(err);
          res.json({ status: 1, msg: "error" });
        } else {
          res.json({ status: 0, msg: "success" });
        }
      });
    }
  });
});

module.exports = router;
