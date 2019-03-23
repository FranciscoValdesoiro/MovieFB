
const apiKey = "BanMePlz";
const url = "http://www.omdbapi.com/?t=Matrix&apikey=BanMePlz";
var ref = firebase.database().ref();
const movieRef = ref.child("movies");

var movieList = document.getElementById("movies");
var titleText = document.getElementById("title");

// Create 
function CreateMovie(movie){
    GetMovie(movie).then(res => {
        return movieRef.push(res)
    })

}

function GetMovies(){
    
}

// Delete
function DeleteMovie(id){

}

function GetMovie(title){
    const url = `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
    return fetch(url).then(res => res.json())
}

// eventos

movieRef.on("value", data => { 
    const peliculasData = data.val()

    console.log("data: ",peliculasData)

    let htmlFinal = "";
    for (const key in peliculasData) {
        if(peliculasData.hasOwnProperty(key)){
            const element = peliculasData[key];
            htmlFinal += `<li>${element.Title}</li>`;
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