export async function getData(query, page, perPage) {
  const SRC_URL = 'https://pixabay.com/api/';
  const API_KEY = '35549464-6e431a9fbd4d75e0b6b25f5be';

  const response = await fetch(`${SRC_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`);
  const images = await response.json();
  return images;
}
