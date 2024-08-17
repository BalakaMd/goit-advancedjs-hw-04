import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { search_images } from './js/pixabay-api';
import { createGalleryMarkup } from './js/render-functions';

const gallery = document.querySelector('.gallery');

const searchForm = document.querySelector('.js-search-form');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchForm.elements.user_query.value;
  const loaderContainer = document.querySelector('.loader-container');
  searchForm.reset();
  gallery.innerHTML = '';

  const loader = document.createElement('span');
  loader.className = 'loader';
  loaderContainer.appendChild(loader);

  search_images(query)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topCenter',
        });
      }

      loader.remove();

      gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(hits));

      const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
      });

      lightbox.refresh();
    })
    .catch(error => {
      loader.remove();
      iziToast.error({
        message: 'An error occurred while fetching images. Please try again!',
        position: 'topCenter',
      });
      console.error('Error fetching images:', error);
    });
});
