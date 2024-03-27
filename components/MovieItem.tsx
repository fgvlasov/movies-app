import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { CircleChevronDown, CirclePlay } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { MovieInterface } from './movie_interface';
import ButtonFavorite from '@/components/buttons/ButtonFavorite';
import useModalStore from '@/hooks/useModalStore';
import Image from 'next/image';

interface MovieProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieProps> = ({ data }) => {
  const { openModal } = useModalStore();

  //console.log(data);

  const genreNames = data.genres.map((genre) => genre.name).join(', ');

  return (
    <Card className="group  col-span relative ">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.overview}</CardDescription>
      </CardHeader>
      <CardContent
        className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          w-full
          transition
          shadow-md
          rounded-b-md
        "
      >
        <div className="flex flex-row items-center gap-3">
          <div className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
            <CirclePlay className="text-black w-4 lg:w-6" />
          </div>
          <ButtonFavorite movieId={data.tmdbId} />
          <div
            //onClick={() => openModal(data?.tmdbId)}
            className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
          >
            <CircleChevronDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
          </div>
        </div>
        {data.year && (
          <p className="text-green-400 font-semibold mt-4">
            Year <span className="text-white">{data.year}</span>
          </p>
        )}
        <div className="flex flex-row mt-4 gap-2 items-center">
          <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
        </div>
        <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
          <p>{genreNames}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
