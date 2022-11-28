import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import {
  fetchRandomImages,
  selectBreedsDictionary,
  selectBreeds,
  selectChoices
} from './dogFormSlice';
import { Button } from '@mui/material';
import DogFormRow from './DogFormRow';
import './DogForm.css';

const DogForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const breedsDictionary = useSelector(selectBreedsDictionary);
  const breeds = useSelector(selectBreeds);
  const rowChoices = useSelector(selectChoices);

  const handleGenerateClick = () => {
    dispatch(fetchRandomImages({}));
  };

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
      <Button
        className="DogForm-button"
        onClick={handleGenerateClick}
        variant="contained"
      >
        Generate
      </Button>
    </form>
  );
};

export default DogForm;
