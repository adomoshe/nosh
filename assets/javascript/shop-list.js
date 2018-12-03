
// $("#shopping-list").hide();

function renderTodos(list) {
    $("#shopping-list").empty(); 

    for (var i = 0; i < list.length; i++) {

      var toDoItem = $("<p>");
      toDoItem.text(list[i]);



      var toDoClose = $("<button>");

      toDoClose.attr("data-to-do", i);
      toDoClose.addClass("checkbox");
      toDoClose.text("X");

      toDoItem = toDoItem.prepend(toDoClose);

      $("#shopping-list").append(toDoItem);
    }
  }

  $("#add-item").on("click", function(event) {
    event.preventDefault();
    $("#shopping-list").show();

    var toDoTask = $("#item-input").val().trim();

    list.push(toDoTask);

    renderTodos(list);


    localStorage.setItem("todolist", JSON.stringify(list));

    $("#item-input").val("");
  });

  $(document).on("click", ".checkbox", function() {
    var toDoNumber = $(this).attr("data-to-do");

    list.splice(toDoNumber, 1);

    renderTodos(list);


    localStorage.setItem("todolist", JSON.stringify(list));
  });


  var list = JSON.parse(localStorage.getItem("todolist"));


  if (!Array.isArray(list)) {
    list = [];
  }

  renderTodos(list);