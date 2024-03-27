'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import MoviesList from '@/components/MoviesList';

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
    genre: '18',
  });

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/movies/search',
          {
            params: searchParams,
          }
        );
        setMovies(response.data.result);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    // Call the function to initiate the API request
    searchMovies();

    // Cleanup function can be added if needed
    return () => {
      // Cleanup code here
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:px-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
          Hello, {user.firstName}
        </p>
      </div>

      <MoviesList data={movies} title="Movie List" />
    </main>
  );
}
