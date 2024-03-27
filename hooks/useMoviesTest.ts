import { useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

const useMoviesTest = (country, services, showType, genre, cursor) => {
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'https://localhost:3001/api/movies/list',
        {
          params: {
            country,
            services,
            showType,
            genre,
            cursor,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };

  const {
    data: movies = [],
    error,
    isValidating,
    mutate,
  } = useSWR(
    [
      'https://localhost:3001/api/movies/list',
      country,
      services,
      showType,
      genre,
      cursor,
    ],
    fetchMovies
  );

  useEffect(() => {
    if (!isValidating && error) {
      // Handle error if needed
    }
  }, [isValidating, error]);

  return { movies, error, isLoading: !movies && !error, isValidating, mutate };
};

export default useMoviesTest;
