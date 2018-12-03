

//When the seach button is pressed its data name is taken and stitched into a query string to be plugged into the initial API call
//Initial API call returns dynamically generated divs for the first 5 recipes with a name, pic, yummly score, cooking time (mins) and a dynamic list of ingredients.
//The user browses these options then clicks on the name of one of the options which enters that recipe id into the second api call
//Second API call generates more detailed information about that specific recipe on the next card, loads an ifram of the recipe url source and gives the button underneath
//an href of the same url to be opened in a different tab.

const veganSearchKey = "&allowedDiet[]=386^Vegan";
const vegetarianSearchKey = "&allowedDiet[]=387^Lacto-ovo vegetarian";


$("#search-by-ingredients-card").hide();
$("#recipe-details-card").hide();
$("#lets-cook-card").hide();

$("#i-have-ingredients-button").on("click", function() {
    $("#what-are-we-making-card").fadeOut();
    $("#search-by-ingredients-card").fadeIn();
});

$("#search-by-ingredients").on("click", function (specialty) {
    console.log("dataValue: ", dataValue)
    var food = $(this).attr("data-value").trim().replace(/,/g, "+");
    console.log("Var food: " + food);

    var specialty = ""

    if ($("#veganSelector2").is(":checked")) {
        specialty = veganSearchKey;
    };

    if($("#vegetarianSelector2").is(":checked")) {
        specialty = vegetarianSearchKey;
    }

    $.ajax({
        url: `https://api.yummly.com/v1/api/recipes?_app_id=c99b39ed&_app_key=d9c01aaa6e3051a79404d54485a08dc3&q=${food+specialty}&requirePictures=true`,
        method: 'GET'
    }).then(function (result) {
        $("#ingredients-results").empty();
        console.log("First API call: ", result);
        var foods = result.matches;
        for (var i = 0; i < 5; i++) {
            console.log("First API call listed results: ", foods[i]);
            var recipeFirstDiv = $("<div class='recipe-result'>");
            var recipeFirstList = $("<ul class='recipe-ingredient-list'>");
            for (var x = 0; x < foods[i].ingredients.length; x++) {
                var recipeFirstListItems = $("<li class='recipe-ingredient-item'>");
                recipeFirstListItems.text(foods[i].ingredients[x]);
                recipeFirstList.append(recipeFirstListItems);
            };
            recipeFirstDiv.append(
                "<h6 class='recipe-name'" + "data-name = " + foods[i].id + " >" + foods[i].recipeName + "</h6>"
                + "<h6 class='recipe-rating'>Yummly Rating: " + foods[i].rating + "</h6>"
                + "<h6 class='recipe-time'>Cooking Time: " + (foods[i].totalTimeInSeconds / 60) + " mins</h6>"
                + "<img class='recipe-image' src=" + foods[i].imageUrlsBySize['90'] + " alt='ingredient picture'>");
            recipeFirstDiv.append(recipeFirstList);
            $("#ingredients-results").append(recipeFirstDiv);
        };
        dataValue = [];
    });
});

$(document).on("click", ".recipe-name", function () {
    $("#recipe-details").empty();
    $("#iframe").empty();
    var searchInput = $(this).attr("data-name");
    $.ajax({
        url: `https://api.yummly.com/v1/api/recipe/${searchInput}?_app_id=c99b39ed&_app_key=d9c01aaa6e3051a79404d54485a08dc3`,
        method: 'GET'
    }).then(function (result) {
        console.log("Second API call: ", result);
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
            + "<img class='recipe-image' src=" + result.images[0].hostedLargeUrl + " alt='ingredient picture'>");
        recipeFirstDiv2.append(recipeFirstList2);
        $("#recipe-details").append(recipeFirstDiv2);
        $("#iframe").attr("src", result.source.sourceRecipeUrl);
        $("#recipe-not-loading").attr("href", result.source.sourceRecipeUrl);
    });
    $("#recipe-details-card").fadeIn();
    $("#lets-cook-card").fadeIn();
});