export default function fetchImages(value) {

    // Create for parametrs!!!
    const url = `https://pixabay.com/api/?key=34700186-64fa17513eb3359bd5c913c6b&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`

    return fetch(url).then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}