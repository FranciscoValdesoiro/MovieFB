
const apiKey = "";
const url = "http://www.omdbapi.com/?t=Matrix&apikey=BanMePlz";
var ref = firebase.database().ref();
const movieRef = ref.child("movies");
var peliculasData;

var movieList = document.getElementById("movies");
var titleText = document.getElementById("title");
var detailText = document.getElementById("detail");
var deleteButton = document.getElementById("detail");


// Create 
function CreateMovie(movie){
    GetMovie(movie).then(res => {
        return movieRef.push(res)
    })

}

function GetMovies(id){
    console.log(movieRef.child(id));
    return movieRef.child(id);
}

// Delete
function DeleteMovie(id){
    movieRef.child(id).remove();
}

function GetMovie(title){
    const url = `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
    return fetch(url).then(res => res.json())
}

// eventos

movieRef.on("value", data => { 
    peliculasData = data.val()

    console.log("data: ",peliculasData)

    let htmlFinal = "";
    for (const key in peliculasData) {
        if(peliculasData.hasOwnProperty(key)){
            const element = peliculasData[key];
            htmlFinal += `<li>${element.Title} <div>| <span data-id="${key}" data-button-type="detail">detail</span> | <span data-id="${key}" data-button-type="delete">delete</span> |</li></div> `;
        }
        
    }

    movieList.innerHTML = htmlFinal;
})

titleText.addEventListener("keyup", event => {
    const titleContent = titleText.value.trim();
    if(event.keyCode === 13){
        CreateMovie(titleContent);
    }
})

movieList.addEventListener("click", event => {
    const detailContent = titleText.value.trim();
    console.log(event);
    console.warn (this);
    console.log(event.target.childNodes[0]);
    
    if(event.target.dataset["buttonType"] == "detail"){
        detailText.innerHTML =`<img src="${peliculasData[event.target.dataset["id"]].Poster}"   <p>${JSON.stringify(peliculasData[event.target.dataset["id"]])}</p>`;        
        
    }
    
    console.log(event.target.getAttribute('data-id'))
    if(event.target.dataset["buttonType"] == "delete"){
        DeleteMovie(event.target.dataset["id"]);
    }
    //nodeValue
})