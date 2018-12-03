// Dynamically creates buttons with the value grabbed from the ingredient submit form
// and places them in their own div
// Submit button attached to form id=ingredient-submit
// Form id for grabbing value id=ingredient-entered
// Inserting new buttons to div on card id=ingredient-insert
// Button classes class=ingredient-btn on btn
// Button on class will change when clicked 

var dataValue = [];
$("#ingredient-submit").on("click", function (event) {
    event.preventDefault();
    if ($("#ingredient-entered").val() !== "") {
        var newDiv = $("<div>");
        var ingredientName = capitalize($("#ingredient-entered").val().trim());
        var newButton = $("<button>");
        newButton.addClass("ingredient-btn on btn");
        newButton.text(ingredientName);
        dataValue.push(ingredientName);
        console.log("dataValue arr: " + dataValue);
        $("#search-by-ingredients").attr("data-value", dataValue);
        $("#ingredient-insert").append(newDiv).append(newButton);
        $("#ingredient-entered").val("");
    };
});

// Buttons start off with .on class but when pressed will switch to .off classs
$(document).on("click", ".on", function () {
    $(this).removeClass("on");
    $(this).addClass("off");
    var spliceIndex = dataValue.indexOf($(this).text());
    dataValue.splice(spliceIndex, 1);
    $("#search-by-ingredients").attr("data-value", dataValue);
});

// When pressed again these buttons will switch again from .off to .on
$(document).on("click", ".off", function () {
    $(this).addClass("on");
    $(this).removeClass("off");
    dataValue.push($(this).text());
    $("#search-by-ingredients").attr("data-value", dataValue);
});

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

