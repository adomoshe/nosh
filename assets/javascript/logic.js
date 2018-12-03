//When the seach button is pressed its data name is taken and stitched into a query string to be plugged into the initial API call
//Initial API call returns dynamically generated divs for the first 5 recipes with a name, pic, yummly score, cooking time (mins) and a dynamic list of ingredients.
//The user browses these options then clicks on the name of one of the options which enters that recipe id into the second api call
//Second API call generates more detailed information about that specific recipe on the next card, loads an ifram of the recipe url source and gives the button underneath
//an href of the same url to be opened in a different tab.

const veganSearchKey1 = "&allowedDiet[]=386^Vegan";
const vegetarianSearchKey1 = "&allowedDiet[]=387^Lacto-ovo vegetarian";


$("#search-by-dish-card").hide();
$("#recipe-details-card2").hide();
$("#lets-cook-card").hide();
$("#ingredients-result-card").hide();

$("#search-by-dish-button").on("click", function () {
    $("#what-are-we-making-card").fadeOut("slow", function () {
        $("#search-by-dish-card").fadeIn();
    });
});

$("#search-by-dish").on("click", function (event) {
    event.preventDefault();
    var food1 = $("#dish-input").val().trim();
    $("#dish-input").val("");
    console.log("Var food: " + food1);

    var specialty1 = ""

    if ($("#veganSelector1").is(":checked")) {
        specialty1 = veganSearchKey1;
    };

    if ($("#vegetarianSelector1").is(":checked")) {
        specialty1 = vegetarianSearchKey1;
    };

    $.ajax({
        url: `https://api.yummly.com/v1/api/recipes?_app_id=c99b39ed&_app_key=d9c01aaa6e3051a79404d54485a08dc3&q=${food1+specialty1}&requirePictures=true`,
        method: 'GET'
    }).then(function (result) {
        $("#ingredients-results").empty();
        console.log("First API call: ", result);
        var foods1 = result.matches;
        for (var i = 0; i < 5; i++) {
            console.log("First API call listed results: ", foods1[i]);
            var recipeFirstDiv1 = $("<div class='recipe-result'>");
            var recipeFirstList = $("<ul class='recipe-ingredient-list'>");
            for (var x = 0; x < foods1[i].ingredients.length; x++) {
                var recipeFirstListItems = $("<li class='recipe-ingredient-item'>");
                recipeFirstListItems.text(foods1[i].ingredients[x]);
                recipeFirstList.append(recipeFirstListItems);
            };
            recipeFirstDiv1.append(
                "<h6 class='recipe-name'" + "data-name1 = " + foods1[i].id + " >" + foods1[i].recipeName + "</h6>" +
                "<h6 class='recipe-rating'>Yummly Rating: " + foods1[i].rating + "</h6>" +
                "<h6 class='recipe-time'>Cooking Time: " + (foods1[i].totalTimeInSeconds / 60) + " mins</h6>" +
                "<img class='recipe-image' src=" + foods1[i].imageUrlsBySize['90'] + " alt='ingredient picture'>");
            recipeFirstDiv1.append(recipeFirstList);
            $("#dish-results").append(recipeFirstDiv1);
        };
        $("#recipe-details-card2").show();
    });
});

$(document).on("click", ".recipe-name", function () {
    $("#recipe-details").empty();
    $("#iframe").empty();
    var searchInput = $(this).attr("data-name1");
    $.ajax({
        url: `https://api.yummly.com/v1/api/recipe/${searchInput}?_app_id=c99b39ed&_app_key=d9c01aaa6e3051a79404d54485a08dc3`,
        method: 'GET'
    }).then(function (result) {
        console.log("Second API call: ", result);
        var recipeFirstDiv3 = $("<div class='recipe-result2'>");
        var recipeFirstList2 = $("<ul class='recipe-ingredient-list2'>");
        for (var x = 0; x < result.ingredientLines.length; x++) {
            var recipeFirstListItems2 = $("<li class='recipe-ingredient-item'>");
            recipeFirstListItems2.text(result.ingredientLines[x]);
            recipeFirstList2.append(recipeFirstListItems2);
        };
        recipeFirstDiv3.append(
            "<h6 class='recipe-name2'>" + result.name + "</h6>" +
            "<h6 class='recipe-rating2'>Yummly Rating: " + result.rating + "</h6>" +
            "<h6 class='recipe-time2'>Cooking Time: " + result.totalTime + "</h6>" +
            "<img class='recipe-image' src=" + result.images[0].hostedLargeUrl + " alt='ingredient picture'>");
        recipeFirstDiv3.append(recipeFirstList2);
        recipeFirstDiv3.append(
            `<button type="button" class="btn btn-secondary btn-lg" id="see-recipe-button">See the Recipe!</button>`
        );
        $("#recipe-details").append(recipeFirstDiv3);
        $("#iframe").attr("src", result.source.sourceRecipeUrl);
        $("#recipe-not-loading").attr("href", result.source.sourceRecipeUrl);
    });
    $("#search-by-dish-card").fadeOut("slow", function () {
        $("#recipe-details-card").fadeIn("slow");
    });
});

$(document).on("click", "#see-recipe-button", function () {
    $("#recipe-details-card").fadeOut("slow", function () {
        $("#lets-cook-card").fadeIn("slow");
    });
});