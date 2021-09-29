var todolist = [];
var id = 1;

function addList() {
  var _title = $("#title").val();
  var _message = $("#message").val();

  if (_title == "" || _message == "") {
    alert("請輸入標題和內容!!");
  } else {
    var newtodo = {
      _id: id,
      title: _title,
      content: _message,
      status: false,
    };

    todolist.push(newtodo);
    newList(newtodo);
    id++;

    // 清空標題內容輸入框的資料
    $("#title").val("");
    $("#message").val("");
  }
}

function newList(data) {
  var status = data.status ? "check" : "";
  var titleClass = data.status ? "title2" : "title";
  var messageClass = data.status ? "message2" : "message";
  var editClass = data.status ? "none" : "inline";

  var content = `
  <div class="content" id="${data._id}" />
    <div class="${titleClass}">
        <input type="checkbox" onclick="changeStatus("${data._id}", this)" />
        <text id="title${data._id}">${data.title}</text>
        <button class="i_btn" onclick="removeList('${data._id}')">刪除</button>
        <button class="i_btn" id="ediy${data._id}" style="display:${editClass}" onclick="editList('${data._id})">修改</button>
        <button class="i_btn" id="update${data._id}" style="display:none" onclick="updateList('${data._id}')">確認</button>
    </div>
    <div class="${messageClass}">
        <text id="message${data._id}">${data.content}</text>
    </div>
  `;
  $("body").append(content);
}
