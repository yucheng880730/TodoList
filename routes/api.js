var express = require("express");
var router = express.Router();
var listModel = [];
var id = 1;

router.post("/addList", function (req, res) {
  var newList = {
    _id: id,
    title: req.body.title,
    content: req.body.content,
    status: false,
  };

  listModel.push(newlist);
  id++;
  res.json({ status: 0, msg: "success", data: newList });
});

module.exports = router;
