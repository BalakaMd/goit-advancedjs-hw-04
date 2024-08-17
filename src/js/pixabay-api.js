export const search_images = query => {
  const url = 'https://pixabay.com/api/';
  return fetch(
    url +
      `?key=45275366-6244e97cf540ed2b53abd51ec&q=${query}&image_type=photo&safesearch=true&orientation=horizontal`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
