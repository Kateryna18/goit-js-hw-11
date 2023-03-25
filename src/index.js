import Notiflix from 'notiflix';
import ImagesApiService from './ImagesApiService';
import LoadMoreBtn from './LoadMoreBtn';


const form = document.querySelector('#search-form');
const boxGallery = document.querySelector('.gallery');


const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});



form.addEventListener('submit', onShowImages);
loadMoreBtn.refs.button.addEventListener('click', onShowMoreImages);


function onShowImages(event) {
  event.preventDefault();
  loadMoreBtn.hide()
  

  imagesApiService.query = event.currentTarget.elements.searchQuery.value;

  
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(images => {
  
    console.log(images);
    if (images.length === 0) {
      return Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } 

    
    renderMarkupImagesCard(images);
    loadMoreBtn.show()
  }); 
}

function onShowMoreImages(event) {
  event.preventDefault();
  imagesApiService.fetchImages().then(renderMarkupImagesCard);

}

function renderMarkupImagesCard(images) {
  clearBoxGallery();
  const markupImagesCard = images.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `
        <div class="photo-card">
         <img src="${webformatURL}" alt="${tags}" loading="lazy" width=50px />
         <div class="info">
           <p class="info-item"><b>Likes: ${likes}</b></p>
           <p class="info-item"><b>Views: ${views}</b></p>
           <p class="info-item"><b>Comments: ${comments}</b></p>
           <p class="info-item"><b>Downloads: ${downloads}</b></p></div>
        </div>`;
    }
  ).join('');

  return boxGallery.insertAdjacentHTML("beforeend", markupImagesCard);
}


function clearBoxGallery() {
    boxGallery.innerHTML = '';
}