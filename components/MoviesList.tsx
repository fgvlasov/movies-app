import MovieItem from '@/components/MovieItem';
import { MovieInterface } from './movie_interface';

interface MoviesProps {
  data: MovieInterface[];
  title: string;
}

const MoviesList: React.FC<MoviesProps> = ({ data, title }) => {
  if (!data) {
    return null;
  }

  //console.log(data);

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <div className="font-2xl mb-4">{title}</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {data.map((movie, index) => (
            <div key={index}>
              <MovieItem data={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
