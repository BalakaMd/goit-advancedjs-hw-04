import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { search_images } from './js/pixabay-api';
import { createGalleryMarkup } from './js/render-functions';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.js-search-form');
const loaderContainer = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.js-load-more-btn');
const limit = 15;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let query = '';
let page = 1;
let totalPages = '';

async function onSearchClick(event) {
  event.preventDefault();
  page = 1;
  query = searchForm.elements.user_query.value.trim();
  searchForm.reset();
  loadMoreBtn.classList.add('is-hidden');
  gallery.innerHTML = '';

  if (query === '') {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topCenter',
    });

    return;
  }

  try {
    const { data } = await search_images(query, page, limit);
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
      });
      loadMoreBtn.classList.add('is-hidden');

      return;
    }
    gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
    totalPages = Math.ceil(data.totalHits / limit);
    if (totalPages > 1) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching images. Please try again!',
      position: 'topCenter',
    });
    console.error('Error fetching images:', error);
    loadMoreBtn.classList.add('is-hidden');
  } finally {
    loaderContainer.classList.add('is-hidden');
  }
  lightbox.refresh();
}

async function onBtnClick() {
  loaderContainer.classList.remove('is-hidden');
  page++;
  try {
    const { data } = await search_images(query, page, limit);
    gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
    searchForm.reset();
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching images. Please try again!',
      position: 'topCenter',
    });
    console.error('Error fetching images:', error);
  } finally {
    loaderContainer.classList.add('is-hidden');
  }
  if (page === totalPages) {
    loadMoreBtn.classList.add('is-hidden');
    iziToast.info({
      message: 'We are sorry, but you have reached the end of search results.',
      position: 'topCenter',
    });
    return;
  }
  lightbox.refresh();

  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    const cardHeight = galleryItems[0].getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

searchForm.addEventListener('submit', onSearchClick);
loadMoreBtn.addEventListener('click', onBtnClick);
