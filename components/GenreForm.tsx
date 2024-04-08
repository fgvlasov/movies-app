import React from 'react';
import { useForm } from 'react-hook-form';

interface GenreFormProps {
  onSubmit: (data: { genre: string }) => void;
  genres: Record<string, string>; // Object with genre IDs as keys and genre names as values
}

export default function GenreForm({ onSubmit, genres }: GenreFormProps) {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data: { genre: string }) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-4">
      <label htmlFor="genre" className="block font-bold mb-2">
        Select Genre:
      </label>
      <select id="genre" {...register('genre')} className="w-full p-2 border">
        {Object.values(genres).map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Filter
      </button>
    </form>
  );
}
