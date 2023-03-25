export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;

    }


    fetchImages() {
    // Create for parametrs!!!
    const url = `https://pixabay.com/api/?key=34700186-64fa17513eb3359bd5c913c6b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`

    return fetch(url)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(images => {
        this.incrementPage();

        return images.hits;
    });
}

incrementPage() {
    this.page += 1;
}

resetPage() {
    this.page = 1;
}

get query() {
    return this.searchQuery;
}

set query(newQuery) {
    this.searchQuery =  newQuery;
}

}



