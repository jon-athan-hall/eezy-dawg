import { useSelector } from 'react-redux';
import {
  selectBreedsDictionary,
  selectBreeds,
  selectChoices
} from './dogFormSlice';
import DogFormRow from './DogFormRow';

const DogForm = (): JSX.Element => {
  const breedsDictionary = useSelector(selectBreedsDictionary);
  const breeds = useSelector(selectBreeds);
  const rowChoices = useSelector(selectChoices);

  return (
    <form className="DogForm">
      {rowChoices.map((rowChoice, index) => {
        /**
         * The sub-breeds select should be empty if no breed has been selected yet.
         * Otherwise, use the breed value to get the actual breed string, then use that
         * breed string with the dictionary to get the sub-breed array.
         */
        const subBreeds = (rowChoice.breed === null) ? [] : breedsDictionary[breeds[rowChoice.breed]];

        return (
          <DogFormRow
            key={index}
            index={index}
            breeds={breeds}
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
