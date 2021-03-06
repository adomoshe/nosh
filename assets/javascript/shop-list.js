
// $("#shopping-list").hide();

function renderTodos(list) {
    $("#shopping-list").empty(); 

    for (var i = 0; i < list.length; i++) {

      var toDoItem = $("<p>");
      toDoItem.text(list[i]);



      var toDoClose = $("<button>");

      toDoClose.attr("data-to-do", i);
      toDoClose.addClass("checkbox");
      toDoClose.html("X");

      toDoItem = toDoItem.prepend(toDoClose);

      $("#shopping-list").append(toDoItem);
    }
  }

  $("#add-item").on("click", function(event) {
    event.preventDefault();
    if ($("#item-input").val() !== "") {

    $("#shopping-list").show();

    var toDoTask = $("#item-input").val().trim();

    function capitalize(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
  };
  
  

    list.push(capitalize(toDoTask));

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