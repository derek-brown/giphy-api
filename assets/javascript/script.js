$(document).ready(function(){

var superheroList = ["Hulk", "Captain America", "Spider-Man", "Iron Man", "Thor"];

  $(document).on("click", "#add-superhero", function(event){
    event.preventDefault();

    var superheroChoice = $("#superhero-input").val().trim();

    superheroList.push(superheroChoice);

    renderButton();
  });

  function activeGif (){
    var state = $(this).attr("data-state");
    var dataAnimate = $(this).attr("data-animate");
    var dataStill = $(this).attr("data-still");

    if(state === "still"){
      $(this).attr("data-state", "animate");
      $(this).attr("src", dataAnimate);
    }
    else{
      $(this).attr("data-state", "still");
      $(this).attr("src", dataStill);
    }
}


  function superheroGif(){
    $("#giphy").empty();

    var superhero = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+superhero+
    "&api_key=1f529fa59ab1412f9b8ddb676d86a854";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      var results = response.data;

      for(var i=0; i<10; i++){
        var gifDiv = $("<div class='item col-md-4'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: "+rating);

        var heroImage = $("<img>");

        heroImage.attr("src", results[i].images.fixed_height_still.url);
        heroImage.attr("data-still", results[i].images.fixed_height_still.url);
        heroImage.attr("data-animate", results[i].images.fixed_height.url);
        heroImage.attr("data-state", "still");
        heroImage.addClass("gif");

        gifDiv.prepend(p);
        gifDiv.prepend(heroImage);

        $("#giphy").prepend(gifDiv);

      }
    });
  }

//For function renderButton
// We are going to loop through the array of superheroes
// We are going to create a button for each hero
// The buttons will be assigned a data for the name of the superhero
// We will then populate the buttons in the HTML awaiting to be clicked!

  function renderButton(){

    $("#superhero-button").empty();

    for(var i=0; i <superheroList.length; i++){

      var newBtn = $("<button>");
      //adding a class to specify the superhero
      newBtn.addClass("name");
      //add an attribute that holds the data to be called later once the button is clicked
      newBtn.attr("data-name", superheroList[i]);
      //populate html with the name of the superhero!
      newBtn.text(superheroList[i]);
      //add the created button to the superhero button section
      $("#superhero-button").append(newBtn);
    }
  }


//awaits click of a superhero with the class of "name"
$(document).on("click", ".name", superheroGif);
//once gifs have populated will either start or stop gifs once clicked
$(document).on("click", ".gif", activeGif);
//sets up the initial buttons of superheroes
renderButton();

}); //closes the document.ready function