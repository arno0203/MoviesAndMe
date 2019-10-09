const API_TOKEN = "0fdfff2ac69958016e04dac8bf836a1b";
const URI = 'https://api.themoviedb.org/3/';


export function getFilmsFromApiWithSearchedText(text) {
    const url = URI + 'search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
    console.log(url)
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getFilmDetailFromApi(id) {
    const url = URI + 'movie/'+id+'?api_key=' + API_TOKEN + '&language=fr'
    console.log(url)
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getImagesFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}
