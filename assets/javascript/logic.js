
const appId = 'b2c7c3f5';
const appKey = 'dce4ead39898dd99d3afbd94e0a5dab7';

$("#search-dish").on('click', function(event){
    event.preventDefault();

    // console.log($('#veganSelector').attr('checked'));

    // if($("#veganSelector").is(":checked")){ console.log("checked")}
    // else{console.log("unchecked")};

    console.log("hello");
    $('.food').empty();
    // $('#dish-input').empty();
    let food = $('#dish-input').val().trim();
    food = food.split(" ");
    buildString(food)
    

    // if($("#veganSelector").is(":checked")){ 
    //     console.log("is checked");
    // }
    // else{console.log("unchecked")};
});


function foodSearch(search){

    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${search}&app_id=${appId}&app_key=${appKey}`,
        method: "GET"

    }).then(function(response){
        console.log(response)
        buildRecipes(response.hits)
        
    });
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
    foodSearch(queryString)
}

function buildArray(string){
     var array = string.split(" ");
    console.log(array);

}





function buildRecipes(recipes){
    
    let row1 = $(`<div class='row'>`);
    let row2 = $(`<div class='row mt-4'>`);
    let row3 = $(`<div class='row mt-4 mb-4'>`);
    let container = $(`.food`);
    for(var j = 0; j < 9; j++){
        
        let entry = recipes[j].recipe;
            
        let ingredientsArray = entry.ingredientLines;
        var healthLabels = recipes[j].recipe.healthLabels;
        var vegetarianStatus = (healthLabels.indexOf("Vegetarian"));
        // console.log(vegetarianStatus);

        // let recipeTitle = recipes[j].recipe.label;
        // var splitTitle = buildArray(recipeTitle);
        // console.log(splitTitle);

        let veganStatus = (healthLabels.indexOf("Vegan"));

        if($("#veganSelector").is(":checked")){
            if(veganStatus == -1){
                console.log("animal products detected");
            }
            else{
            
                //  -----------else if vegetarian status is not -1---------------------
                let ingHolder = $("<div>");
                
                if(j <= 2){
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
            container.append(row1)
            container.append(row2)
            container.append(row3)
            };
        }
            
            
         
        else if($("#vegetarianSelector").is(":checked")){ 

            if(vegetarianStatus == -1){
                console.log("meat dish detected");
            }
        // 
            else{
            
            //  -----------else if vegetarian status is not -1---------------------
            let ingHolder = $("<div>");
            
            if(j <= 2){
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
        container.append(row1)
        container.append(row2)
        container.append(row3)
        };
       


        }


// ---else if vegetarian is unchecked-----
    else{ 
        let ingHolder = $("<div>");
            
            if(j <= 2){
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
        };
    container.append(row1)
    container.append(row2)
    container.append(row3)


    };
}
        
