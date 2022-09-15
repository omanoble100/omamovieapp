// API KEY: 7149f215ca0b59cfae4a48e016e91cf5

// 'https://api.themoviedb.org/3/search/movie?api_key=7149f215ca0b59cfae4a48e016e91cf5&query=' 


// Declaring Variables

const searchButton = document.getElementById('search')
const inputValue = document.querySelector('#inputValue')
const bgImage = document.querySelector('.bgImage')
const storeMovies = document.querySelector('.movies')
const movieTitle = document.querySelector('.title')


// Creating variables for API Links
const searchLink = '&query=';
// const url = '';
const imageURL = 'https://image.tmdb.org/t/p/w500';




// Function Looping - All movies Images
  const theMoviesImgs = (movies) => {
    
    return movies.map((movie) => {
        
       if(movie.poster_path){
            
        return `<div class ="movie"><img src=${imageURL + movie.poster_path} data-movie-id=${movie.id}/>
                    <div class="title"><p>${movie.title || movie.name}</p></div>
                    
                </div> `
       }
            
    })
  }

 
// Funtion that Displays the format of images to the DOM

const displayOutput = (movies) => {
    const movieImgDiv= document.createElement('div');
    movieImgDiv.setAttribute('class', 'movieView')

    const movieTemplate = `${theMoviesImgs(movies)}`
    movieImgDiv.innerHTML = movieTemplate.replaceAll(',', "");
    return movieImgDiv;
}


// Dynamic funtion to feach api link with parameter (url)
const fetchApiLink = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
       
        storeMovies.innerHTML = ''
        const movies = data.results;
      
        const movieBlock = displayOutput(movies);

        storeMovies.appendChild(movieBlock);

    })
    .catch((err) => alert("This movie is not available"));
}


// Creating a function for the search button using onclick
searchButton.onclick = (e) => {
    // Stops default function from running
    e.preventDefault();
    // Create variable link and API search link
        let value = inputValue.value
        inputValue.value = '';
    // Use the dynamic APi link to get data
    let link = 'https://api.themoviedb.org/3/search/movie?api_key=7149f215ca0b59cfae4a48e016e91cf5' + searchLink + value
    fetchApiLink(link)
}

// Funtion that Displays the trending videos
const trending = () => {
    let trendingUrl = 'https://api.themoviedb.org/3/trending/all/day?api_key=7149f215ca0b59cfae4a48e016e91cf5';
    fetchApiLink(trendingUrl)
}

trending()
// Funtion that Displays the Original/Series videos
const originalMovies = () => {
    let url = 'https://api.themoviedb.org/3/discover/tv?api_key=7149f215ca0b59cfae4a48e016e91cf5&with_networks=213';
    fetchApiLink(url)
}
// Funtion that Displays the toprated videos
const topRated = () => {
    let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=7149f215ca0b59cfae4a48e016e91cf5&language=en-US&page=1';
    fetchApiLink(url)
}
// Funtion that Displays the upcoming movies
const upComing = () => {
    let url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=7149f215ca0b59cfae4a48e016e91cf5&language=en-US&page=1';
    fetchApiLink(url)
}

// iframe for the Video display
const displayMovieTrailer = (videoKey) => {
    const iframe = document.createElement('iframe');
    iframe.src = videoKey;
    iframe.width = 700;
    iframe.height = 350;
    iframe.allowFullscreen = true;
    
    return iframe
}

// On click of a an Img/div/p - display the info of the movie with trailer
document.onclick = (event) => {
    // Clears out the page
    bgImage.innerHTML = ''
    const target = event.target;
    
    if(target.tagName.toLowerCase() === 'img' ){
        const movieId = target.dataset.movieId;
        const path = `/${movieId}/videos`
        const endpoint = `https://api.themoviedb.org/3/movie/${path}?api_key=7149f215ca0b59cfae4a48e016e91cf5&language=en-US&page=1`
        let youtubeLink = 'https://www.youtube.com/embed/'
      
    
        fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        if(data.results){
         const videoKey = data.results;
        //  console.log(data.results)
            // Looping through the videos and getting the one with the name:Official Trailer
            if(videoKey.length === 0){
                // console.log(videoKey)
                alert('The movie trailer is not available')
                return storeMovies
            } else 
           { const findVideo = videoKey.find(video => video.name.includes('Official Trailer') || video.name.includes('Trailer') || video.name.includes('Teaser'))
                        if(findVideo){
                            youtubeLink += findVideo.key 
                           
                        }else {
                            youtubeLink +=videoKey[0].key 
                        }      
        }
            
               

            } else {
                alert("The movie trailer is not available")
                return storeMovies
            }
            storeMovies.innerHTML = ''
            const iframeContainer = displayMovieTrailer(youtubeLink);
            // bgImage.style.display = 'block'
           storeMovies.appendChild(iframeContainer)
             
        })
        .catch((err) => alert("The movie trailer is not available"));
    }
}

