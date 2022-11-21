import { useState } from 'react';
import DogFormRow from './DogFormRow';

interface BreedDictionary {
  [key: string]: string[] | never[]
};

interface RowChoice {
  breed: number | undefined;
  subBreed: number | undefined;
  imageCount: number
};

const BREEDS = Object.keys(BREEDS_MESSAGE);

const DogForm = (): JSX.Element => {
  const [rowChoices, setRowChoices] = useState<RowChoice[]>([{
    breed: 0,
    subBreed: 0,
    imageCount: 0
  }]);

  return (
    <form className="DogForm">
      {rowChoices.map((rowChoice, index) => {
        /**
         * The sub-breeds select should be empty if no breed has been selected yet.
         * Otherwise, use the breed value to get the actual breed string, then use that
         * breed string with the dictionary to get the sub-breed array.
         */
        const subBreeds = (rowChoice.breed === undefined) ? [] : BREEDS_MESSAGE[BREEDS[rowChoice.breed]];

        return (
          <DogFormRow
            key={index}
            index={index}
            breeds={BREEDS}
            breedValue={rowChoice.breed}
            subBreeds={subBreeds}
            subBreedValue={rowChoice.subBreed}
            imageCount={rowChoice.imageCount}
          />
        );
      })}
    </form>
  );
};

export default DogForm;
