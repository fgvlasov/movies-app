'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import MoviesList from '@/components/MoviesList';
import GenreForm from '@/components/GenreForm';

interface SearchParams {
  country: string;
  services: string;
  showType: string;
  genre: string;
}

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    country: 'us',
    services: 'netflix',
    showType: 'all',
    genre: '18', // Default genre ID
  });
  const [genres, setGenres] = useState<Record<string, string>>({}); // Updated to object with genre IDs and names

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/genres');
        setGenres(response.data.result);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/movies/search',
          {
            params: searchParams,
          }
        );
        setMovies(response.data.result); // Update movies state with new data
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    searchMovies();
  }, [searchParams]); // Add searchParams as a dependency

  const handleGenreSubmit = (formData: { genre: string }) => {
    const genreId = Object.keys(genres).find(
      (key) => genres[key] === formData.genre
    );
    setSearchParams({ ...searchParams, genre: genreId || '' });
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  console.log(searchParams);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:px-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
          Hello, {user.firstName}
        </p>
      </div>
      <GenreForm genres={Object.values(genres)} onSubmit={handleGenreSubmit} />{' '}
      {/* Pass genres as an array of genre names */}
      <MoviesList data={movies} title="Movie List" />{' '}
      {/* Ensure that MoviesList component re-renders with updated movies data */}
    </main>
  );
}
