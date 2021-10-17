var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true });

var listSchema = new mongoose.Schema({
  title: String,
  content: String,
  status: Boolean,
});

// 呼叫Schema中的set()方法來設定表(collection)的名稱(list)
listSchema.set("collection", "list");

// 用model()方法建立名稱為list的模組(model)
var model = mongoose.model("list", listSchema);
