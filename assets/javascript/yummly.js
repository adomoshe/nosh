
var searchTerms = "Going to be grabbing a bunch of ingredients";
var yummlyScore = [];
var recipePic = [];
var recipeID = [];
var iframeValue = "";

// I want to return yummly score, name ,and picture
  


//     username = capitalize($("#username").val());
// }
// function capitalize(name) {
//     return name.charAt(0).toUpperCase() + name.slice(1);
//


$("#search-by-ingredients").on("click", function () {
    var food = $("#search-by-ingredients").attr("data-value").trim().replace(/,/g, "+");
    console.log("food: " + food);

$.ajax({
url: `https://api.yummly.com/v1/api/recipes?_app_id=c99b39ed&_app_key=d9c01aaa6e3051a79404d54485a08dc3&${food}&requirePictures=true`,
method: 'GET'
}).then(function(result) {
  console.log(result)
  var foods = result.matches;
  for (var i= 0; i < 5; i++) { 
  console.log(foods[i]);
  var recipeFirstDiv = $("<div class='recipe-result'>");
  var recipeFirstList = $("<ul class='recipe-ingredient-list'>");

      for (var x = 0; x < foods[i].ingredients.length; x++) {
        var recipeFirstListItems = $("<li class='recipe-ingredient-item'>");
        recipeFirstListItems.text(foods[i].ingredients[x]);
        recipeFirstList.append(recipeFirstListItems);
      };

  console.log("might be an object: " + recipeFirstList);
  recipeFirstDiv.append(
    "<h6 class='recipe-name'" + "data-name = " + foods[i].id + " >" + foods[i].recipeName + "</h6>"
    + "<h6 class='recipe-rating'>Yummly Rating: " + foods[i].rating + "</h6>"
    + "<h6 class='recipe-time'>Cooking Time: " + (foods[i].totalTimeInSeconds/60) + " mins</h6>"
    + "<img class='recipe-image' src=" + foods[i].imageUrlsBySize['90'] + " alt='ingredient picture'>")
    recipeFirstDiv.append(recipeFirstList);
  $("#ingredients-results").append(recipeFirstDiv);
  console.log(foods[i].id);
  recipeID.push(foods[i].id);
  console.log(recipeID);
  };
});
});


   $(document).on("click", ".recipe-name",  function (){
    $("#recipe-details").empty();
    $("#iframe").empty();
    var searchInput = $(this).attr("data-name");
    $.ajax({
      url: `https://api.yummly.com/v1/api/recipe/${searchInput}?_app_id=c99b39ed&_app_key=d9c01aaa6e3051a79404d54485a08dc3`,
      method: 'GET'
    }).then(function(result) {
        console.log(result)
        

        console.log(result)
        var recipeFirstDiv2 = $("<div class='recipe-result2'>");
        var recipeFirstList2 = $("<ul class='recipe-ingredient-list2'>");
  
            for (var x = 0; x < result.ingredientLines.length; x++) {
              var recipeFirstListItems2 = $("<li class='recipe-ingredient-item'>");
              recipeFirstListItems2.text(result.ingredientLines[x]);
              recipeFirstList2.append(recipeFirstListItems2);
            };

        recipeFirstDiv2.append(
          "<h6 class='recipe-name2'>" + result.name + "</h6>"
          + "<h6 class='recipe-rating2'>Yummly Rating: " + result.rating + "</h6>"
          + "<h6 class='recipe-time2'>Cooking Time: " + result.totalTime + " mins</h6>"
          + "<img class='recipe-image' src=" + result.images[0].hostedLargeUrl + " alt='ingredient picture'>")
          recipeFirstDiv2.append(recipeFirstList2);
        $("#recipe-details").append(recipeFirstDiv2);

        $("#iframe").attr("src", result.source.sourceRecipeUrl);
        $("#recipe-not-loading").attr("href", result.source.sourceRecipeUrl);

        console.log(result.ingredientLines);
        console.log(result.source.sourceDisplayName);
        console.log(result.source.sourceRecipeUrl);
        console.log(result.rating);
        console.log(result.totalTime);
        console.log(result.images[0].hostedLargeUrl);
  });
});