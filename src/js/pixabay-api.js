import axios from 'axios';

export const search_images = (query, page, limit) => {
  axios.defaults.baseURL = 'https://pixabay.com/';

  const axiosSetup = {
    params: {
      key: '45275366-6244e97cf540ed2b53abd51ec',
      q: query,
      image_type: 'photo',
      safesearch: true,
      orientation: 'horizontal',
      page: page,
      per_page: limit,
    },
  };
  return axios.get('api/', axiosSetup);
};
