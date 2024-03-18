/**
 * Fetches data from the specified URL.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 */
export const fetchData = async () => {
  const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment'); // will be fetched from the environment variable
  const data = await response.json();
  return data;
};