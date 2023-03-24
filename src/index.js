import fetchImages from './fetchImages';
import Notiflix from 'notiflix';

// Користувач буде вводити рядок для пошуку у текстове поле, а по сабміту форми необхідно виконувати HTTP-запит.

// 1. Get a link to the form, div.gallery.
// 2. Add an event listener 'submit' to the form and pass its function fetchImages(value) that executes HTTP the request when the form is submitted
// 3. Create function fetchImages(value), that gives only result request.

// Елемент div.gallery спочатку міститься в HTML документі, і в нього необхідно рендерити розмітку карток зображень.
// Під час пошуку за новим ключовим словом необхідно повністю очищати вміст галереї, щоб не змішувати результати.
// 1. Create function that will render the markup on the query results.
// 2. Create function that clears the div.gallery before each new request.

const form = document.querySelector('#search-form');
const boxGallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more')

form.addEventListener('submit', onShowImages);
// btnLoadMore.addEventListener('click', onShowMoreImages);

function onShowImages(event) {
  event.preventDefault();
  const searchQuery = form.elements.searchQuery.value;
  console.log(searchQuery);

  fetchImages(searchQuery).then(({hits}) => {
    console.log(hits);
    if (hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {

        renderMarkupImagesCard(hits);
    }
  });
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
         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
         <div class="info">
           <p class="info-item"><b>Likes: ${likes}</b></p>
           <p class="info-item"><b>Views: ${views}</b></p>
           <p class="info-item"><b>Comments: ${comments}</b></p>
           <p class="info-item"><b>Downloads: ${downloads}</b></p></div>
        </div>`;
    }
  ).join('');

  return boxGallery.innerHTML = markupImagesCard;
}


function clearBoxGallery() {
    boxGallery.innerHTML = '';
}