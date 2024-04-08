import React from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  country: string;
  services: string[];
  showType: string;
  genre: string[];
  keyword: string;
}

interface FilterFormProps {
  genres: string[];
  countries: string[];
  onSubmit: (formData: FormData) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  genres,
  countries,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmitHandler = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="country" className="block font-medium text-gray-700">
          Country
        </label>
        <select
          {...register('country')}
          id="country"
          className="form-select mt-1 block w-full"
        >
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="services" className="block font-medium text-gray-700">
          Services
        </label>
        {/* Render services checkboxes here */}
      </div>

      <div>
        <label htmlFor="showType" className="block font-medium text-gray-700">
          Show Type
        </label>
        {/* Render showType radio buttons here */}
      </div>

      <div>
        <label htmlFor="genre" className="block font-medium text-gray-700">
          Genre
        </label>
        {/* Render genre checkboxes here */}
      </div>

      <div>
        <label htmlFor="keyword" className="block font-medium text-gray-700">
          Keyword
        </label>
        <input
          {...register('keyword')}
          type="text"
          id="keyword"
          className="form-input mt-1 block w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Filter
      </button>
    </form>
  );
};

export default FilterForm;
