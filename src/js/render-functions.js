export function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img
                    class="gallery-image"
                    src="${webformatURL}"
                    alt="${tags}"
                    />
            </a>
            <div class="info">
                <div><span>Likes:</span> ${likes}</div>
                <div><span>Views:</span> ${views}</div>
                <div><span>Comments:</span> ${comments}</div>
                <div><span>Downloads:</span> ${downloads}</div>
            </div>
         </li>

`
    )
    .join('');
}
