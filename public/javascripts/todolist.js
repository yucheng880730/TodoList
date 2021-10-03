var todolist = [];
var id = 1;

// function addList() {
//   var _title = $("#title").val();
//   var _message = $("#message").val();

//   if (_title == "" || _message == "") {
//     alert("請輸入標題和內容!!");
//   } else {
//     var newtodo = {
//       _id: id,
//       title: _title,
//       content: _message,
//       status: false,
//     };

//     todolist.push(newtodo);
//     newList(newtodo);
//     id++;

//     // 清空標題內容輸入框的資料
//     $("#title").val("");
//     $("#message").val("");
//   }
//}

// 此方法用來建立代辦項目畫面，並將代辦清單顯示在頁面上
function newList(data) {
  // 依待辦項目狀態，判斷代辦項目狀態
  var status = data.status ? "check" : "";
  var titleClass = data.status ? "title2" : "title";
  var messageClass = data.status ? "message2" : "message";

  // 依待辦項目的狀態，判斷修改按鈕是否顯示
  var editClass = data.status ? "none" : "inline";

  // 建立新增的代辦項目html程式碼，這裡使用ES6文字模板
  var content = `
    <div class="content" id="${data._id}">
      <div class="${titleClass}">
          <input type="checkbox" onclick="changeStatus('${data._id}', this)" />
          <text id="title${data._id}">${data.title}</text>
          <button class="i_btn" onclick="removeList('${data._id}')">刪除</button>
          <button class="i_btn" id="edit${data._id}" style="display:${editClass}" onclick="editList('${data._id}')">修改</button>
          <button class="i_btn" id="update${data._id}" style="display:none" onclick="updateList('${data._id}')">確認</button>
      </div>
      <div class="${messageClass}">
          <text id="message${data._id}">${data.content}</text>
      </div>
    </div>`;
  // 將content加入<body>中顯示在頁面
  $("body").append(content);
}

function editList(id) {
  $("#edit" + id).css("display", "none");
  $("#update" + id).css("display", "inline");

  // 建立一個<input>元素為修改標題用
  var input = document.createElement("input");
  input.type = "text";
  input.id = "edit_title" + id;
  input.value = $("#title" + id).text();
  input.size = Math.max((20 / 4) * 3, 4);

  // 隱藏原本之標題
  $("#title" + id).css("display", "none");
  // 在標題之父層插入新建立之輸入框
  $("#title" + id)
    .parent()
    .append(input);

  // 建立一個<input>元素為修改內容用
  var message_input = document.createElement("input");
  message_input.type = "text";
  message_input.id = "edit_message" + id;
  message_input.value = $("#message" + id).text();
  message_input.size = Math.max((50 / 4) * 3, 4);

  $("#message" + id).css("display", "none");
  $("#message" + id)
    .parent()
    .append(message_input);
}

// 修改完內文後要保存的updateList(id)方法
// function updateList(id) {
//   var title = $("#edit_title" + id).val();
//   var message = $("#edit_message" + id).val();

//   $("#title" + id).text(title);
//   $("#message" + id).text(message);

//   $("#edit" + id).css("display", "inline");
//   $("#update" + id).css("display", "none");

//   $("#title" + id).css("display", "inline");
//   $("#message" + id).css("display", "inline");

//   // 將修改狀況下的輸入框移除
//   $("#edit_title" + id).remove();
//   $("#edit_message" + id).remove();
// }

// function removeList(id) {
//   var index = todolist.findIndex((element) => element._id === id);
//   todolist.splice(index, 1);
//   $("#" + id).remove();
// }

// function changeStatus(id, btnstatus) {
//   var title = btnstatus.parentNode;
//   var message = title.nextElementSibling;
//   if (btnstatus.checked) {
//     title.className = "title2";
//     message.className = "message2";
//     $("#edit" + id).css("display", "none");
//     $("#update" + id).css("display", "none");

//     // 判斷是否為修改中狀態，則是要重新轉換為文字模式並把輸入框移除
//     if (document.getElementById("edit_title" + id)) {
//       $("#title" + id).css("display", "inline");
//       $("#message" + id).css("display", "inline");
//       $("#edit_title" + id).remove();
//       $("#edit_message" + id).remove();
//     }
//   } else {
//     // checkbox為勾選，回到未勾選狀態，同時須顯示更改標題及內容
//     title.className = "title";
//     message.className = "message";
//     $("#edit" + id).css("display", "inline");
//   }
// }

// 用來新增代辦項目
function addList() {
  // 存入輸入框的代辦標題及內容
  var _title = $("#title").val();
  var _message = $("#message").val();

  if (_title == "" || _message == "") {
    alert("請輸入標題和內容!!");
  } else {
    // 使用POST方法呼叫addListAPI，並將_tittle _messae發送給後端處理
    $.post(
      "http://localhost:3000/api/addList",
      {
        title: _title,
        content: _message,
      },
      function (res) {
        newList(res.data);
        // 清空標題內容輸入框的資料
        $("#title").val("");
        $("#message").val("");
      }
    );
  }
}

// 呼叫getList()方法，做為執行時初始化代辦清
getList();
function getList() {
  $.get("http://localhost:3000/api/getList", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      // 呼叫自定義的newList()方法
      newList(data[i]);
    }
  });
}

// 新增此方法用以確認修改好的代辦項目
function updateList(id) {
  // 取得目前輸入框中標題及內容值
  var title = $("#edit_title" + id).val();
  var message = $("#edit_message" + id).val();

  $.post(
    "http://localhost:3000/api/updateList",
    { id: id, title: title, content: message },
    function (res) {
      // status == 0 及代表修改成功
      if (res.status == 0) {
        $("#title" + id).text(title);
        $("#message" + id).text(message);
        $("#edit" + id).css("display", "inline");
        $("#update" + id).css("display", "none");
        $("#title" + id).css("display", "inline");
        $("#message" + id).css("display", "inline");
        $("#edit_title" + id).remove();
        $("#edit_message" + id).remove();
      }
    }
  );
}

function removeList(id) {
  $.post("http://localhost:3000/api/removeList", { id: id }, function (res) {
    if (res.status == 0) {
      $("#" + id).remove();
    }
  });
}

function changeStatus(id, btnstatus) {
  var title = btnstatus.parentNode;
  var message = title.nextElementSibling;

  $.post(
    "http://localhost:3000/api/changeStatus",
    { id: id, status: btnstatus.checked },
    function (res) {
      if (res.status == 0) {
        if (btnstatus.checked) {
          title.className = "title2";
          message.className = "message2";
          $("#edit" + id).css("display", "none");
          $("#update" + id).css("display", "none");

          if (document.getElementById("edit_title" + id)) {
            $("#title" + id).css("display", "inline");
            $("#message" + id).css("display", "inline");
            $("#edit_title" + id).remove();
            $("#edit_message" + id).remove();
          }
        } else {
          title.className = "title";
          message.className = "message";
          $("#edit" + id).css("display", "inline");
        }
      }
    }
  );
}
