
const appId = 'b2c7c3f5';
const appKey = 'dce4ead39898dd99d3afbd94e0a5dab7';
const veganSearchKey = "&allowedDiet[]=386^Vegan";
const vegetarianSearchKey = "&allowedDiet[]=387^Lacto-ovo vegetarian";
let activeDietKey = "";

$("#search-by-dish").on('click', function(event){
    event.preventDefault();

    // console.log($('#veganSelector').attr('checked'));

    // if($("#veganSelector").is(":checked")){ console.log("checked")}
    // else{console.log("unchecked")};

    console.log("hello");
    $('.food').empty();
    $('#dish-results').empty();
    let food = $('#dish-input').val().trim();
    food = food.split(" ");
    buildString(food)

    
});
// API call for yumilly recipes
// $.ajax({
//     url: "https://api.yummly.com/v1/api/recipe/Hot-Turkey-Salad-Sandwiches-Allrecipes?_app_id=549c0393&_app_key=de9d1e52c106afb7e246dfc95a616c24",
//     method: "GET"
//     // headers: { 'Authorization' : "Token 37898cb2ffb3e95284ad45e40879613c1ca4774e" },
//     // processData: false
// }).then(function(response){
//     console.log(response);
// });


// API call for yumilly diet dictionary
// $.ajax({


    
//     url: 'http://api.yummly.com/v1/api/metadata/diet?_app_id=549c0393&_app_key=de9d1e52c106afb7e246dfc95a616c24&q=',
//     method: "GET"

// }).then(function(response){
//     console.log(response)
//     buildRecipes(response.matches)
// });
    
// main API call
function foodSearch(search){
    console.log("plain API search activated");
    let keyTerms = search;
    $.ajax({
        url: 'https://api.yummly.com/v1/api/recipes?_app_id=549c0393&_app_key=de9d1e52c106afb7e246dfc95a616c24&q='+keyTerms,
        method: "GET"
        
        
    }).then(function(response){
        console.log('response ', response);
        buildRecipes(response.matches);

    });
}

// API call for vegetarian

function foodSearchVegetarian(search){
    console.log("vegetarian API search activated");
    let keyTerms = search;
    $.ajax({
        url: 'https://api.yummly.com/v1/api/recipes?_app_id=549c0393&_app_key=de9d1e52c106afb7e246dfc95a616c24&q='+keyTerms+vegetarianSearchKey,
        method: "GET"
        
        
    }).then(function(response){
        console.log('response ', response);
        buildRecipes(response.matches);

    });
}

// API call for vegan

function foodSearchVegan(search){
    console.log("vegan API search activated");
    let keyTerms = search;
    $.ajax({
        url: 'https://api.yummly.com/v1/api/recipes?_app_id=549c0393&_app_key=de9d1e52c106afb7e246dfc95a616c24&q='+keyTerms+veganSearchKey,
        method: "GET"
        
        
    }).then(function(response){
        console.log('response ', response);
        buildRecipes(response.matches);

    });
}

function buildArray(string){
    var array = string.split(" ");
//    console.log('array', array);

}

function buildString(array){
    var queryString = '';
    for(let i = 0; i < array.length; i++){
        if(i === array.length - 1){
            queryString += array[i];
        } else {
            queryString += array[i] + "+"
        }
    }

    if($("#veganSelector1").is(":checked")){ 
        console.log("vegan is checked");
        foodSearchVegan(queryString);
        
    }
    else if($("#vegetarianSelector1").is(":checked")){ 
        console.log("vegetarian is checked");
        foodSearchVegetarian(queryString);  
    }
    else{
        foodSearch(queryString);
    };

    


    
    
}







function buildRecipes(recipes){
    // console.log(recipes);
    let row1 = $(`<div class='row'>`);
    let row2 = $(`<div class='row mt-4'>`);
    let row3 = $(`<div class='row mt-4 mb-4'>`);
    let container = $(`.food`);
    for(var j = 0; j < 9; j++){
        
        let entry = recipes[j];
        // console.log(entry.ingredients+"entry");
        
        let ingredientsArray = entry.ingredients;
        // console.log(ingredientsArray);
        // var healthLabels = recipes[j].recipe.healthLabels;
//         var vegetarianStatus = (healthLabels.indexOf("Vegetarian"));
//         // console.log(vegetarianStatus);

        let recipeTitle = entry.recipeName;
            
        var splitTitle = buildArray(recipeTitle);
        // console.log(splitTitle);

//         let veganStatus = (healthLabels.indexOf("Vegan"));

//         if($("#veganSelector").is(":checked")){
//             if(veganStatus == -1){
//                 console.log("animal products detected");
//             }
//             else{
            
//                 //  -----------else if vegetarian status is not -1---------------------
                let ingHolder = $("<div>");
                
                if(j <= 2){
                    let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
                                    <img class="card-img-top" src=${entry.smallImageUrls[0]} alt="Card image cap">
                                    <div class="card-body text-center">
                                        <h3 class="card-title">${entry.recipeName}</h3>  
                                        ${ingredientsArray.map((item) => {
                                        return "<p class='card-text'>"+ item + "</p>";
                                        }).join('')}
                                        <h5 class="card-text">${entry.source}</h5>
                                        <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
                                    </div>
                                </div>`
                    $(row1).append(card);
                } 
                else if(j <= 5) {
                    let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
                                <img class="card-img-top" src=${entry.image} alt="Card image cap">
                                <div class="card-body text-center">
                                    <h3 class="card-title">${entry.label}</h3>  
                                    ${ingredientsArray.map((item) => {
                                        return "<p class='card-text'>"+ item + "</p>";
                                    }).join('')}
                                    <h5 class="card-text">${entry.source}</h5>
                                    <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
                                </div>
                            </div>`
                    $(row2).append(card);
                } else {
                    let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
                                <img class="card-img-top" src=${entry.image} alt="Card image cap">
                                <div class="card-body text-center">
                                    <h3 class="card-title">${entry.label}</h3>  
                                    ${ingredientsArray.map((item) => {
                                        return "<p class='card-text'>"+ item + "</p>";
                                    }).join('')}
                                    <h5 class="card-text">${entry.source}</h5>
                                    <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
                                </div>
                            </div>`
                    $(".card-body").append(ingHolder)
                    $(row3).append(card);
                } 
            $("#dish-results").append(row1)
            $("#dish-results").append(row2)
            $("#dish-results").append(row3)
            };
        }
    
            
         
//         else if($("#vegetarianSelector").is(":checked")){ 

//             if(vegetarianStatus == -1){
//                 console.log("meat dish detected");
//             }
//         // 
//             else{
            
//             //  -----------else if vegetarian status is not -1---------------------
//             let ingHolder = $("<div>");
            
//             if(j <= 2){
//                 let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
//                                 <img class="card-img-top" src=${entry.image} alt="Card image cap">
//                                 <div class="card-body text-center">
//                                     <h3 class="card-title">${entry.label}</h3>  
//                                     ${ingredientsArray.map((item) => {
//                                     return "<p class='card-text'>"+ item + "</p>";
//                                     }).join('')}
//                                     <h5 class="card-text">${entry.source}</h5>
//                                     <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
//                                 </div>
//                             </div>`
//                 $(row1).append(card);
//             } 
//             else if(j <= 5) {
//                 let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
//                             <img class="card-img-top" src=${entry.image} alt="Card image cap">
//                             <div class="card-body text-center">
//                                 <h3 class="card-title">${entry.label}</h3>  
//                                 ${ingredientsArray.map((item) => {
//                                     return "<p class='card-text'>"+ item + "</p>";
//                                 }).join('')}
//                                 <h5 class="card-text">${entry.source}</h5>
//                                 <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
//                             </div>
//                         </div>`
//                 $(row2).append(card);
//             } else {
//                 let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
//                             <img class="card-img-top" src=${entry.image} alt="Card image cap">
//                             <div class="card-body text-center">
//                                 <h3 class="card-title">${entry.label}</h3>  
//                                 ${ingredientsArray.map((item) => {
//                                     return "<p class='card-text'>"+ item + "</p>";
//                                 }).join('')}
//                                 <h5 class="card-text">${entry.source}</h5>
//                                 <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
//                             </div>
//                         </div>`
//                 $(".card-body").append(ingHolder)
//                 $(row3).append(card);
//             } 
//         container.append(row1)
//         container.append(row2)
//         container.append(row3)
//         };
       


//         }


// // ---else if vegetarian is unchecked-----
//     else{ 
//         let ingHolder = $("<div>");
            
//             if(j <= 2){
//                 let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
//                             <img class="card-img-top" src=${entry.image} alt="Card image cap">
//                             <div class="card-body text-center">
//                                 <h3 class="card-title">${entry.label}</h3>  
//                                 ${ingredientsArray.map((item) => {
//                                     return "<p class='card-text'>"+ item + "</p>";
//                                 }).join('')}
//                                 <h5 class="card-text">${entry.source}</h5>
//                                 <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
//                             </div>
//                         </div>`
//                 $(row1).append(card);
//             } 
//             else if(j <= 5) {
//                 let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
//                             <img class="card-img-top" src=${entry.image} alt="Card image cap">
//                             <div class="card-body text-center">
//                                 <h3 class="card-title">${entry.label}</h3>  
//                                 ${ingredientsArray.map((item) => {
//                                     return "<p class='card-text'>"+ item + "</p>";
//                                 }).join('')}
//                                 <h5 class="card-text">${entry.source}</h5>
//                                 <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
//                             </div>
//                         </div>`
//                 $(row2).append(card);
//             } else {
//                 let card = `<div class="card mx-auto grow m-3" style="width: 22rem;">
//                             <img class="card-img-top" src=${entry.image} alt="Card image cap">
//                             <div class="card-body text-center">
//                                 <h3 class="card-title">${entry.label}</h3>  
//                                 ${ingredientsArray.map((item) => {
//                                     return "<p class='card-text'>"+ item + "</p>";
//                                 }).join('')}
//                                 <h5 class="card-text">${entry.source}</h5>
//                                 <a href=${entry.url} class="btn btn-primary">Recipe Link</a>
//                             </div>
//                         </div>`
//                 $(".card-body").append(ingHolder)
//                 $(row3).append(card);
//             }
//         };
//     container.append(row1)
//     container.append(row2)
//     container.append(row3)


//     };
// }
        
