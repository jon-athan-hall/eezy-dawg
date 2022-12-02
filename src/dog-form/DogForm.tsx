import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import {
  addChoice,
  fetchRandomImages,
  selectBreedsDictionary,
  selectBreeds,
  selectChoices,
  updateChoice
} from './dogFormSlice';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import DogFormRow from './DogFormRow';
import './DogForm.css';

interface DogFormProps {
  handleOpen: () => void;
};

const DogForm = ({ handleOpen }: DogFormProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const breedsDictionary = useSelector(selectBreedsDictionary);
  const breeds = useSelector(selectBreeds);
  const rowChoices = useSelector(selectChoices);

  /**
   * Add a new, empty choice object of breed, sub-breed, and image count
   * (and therefore a new DogFormRow too).
   */
  const handleAddClick = () => {
    dispatch(addChoice());
  }

  const handleGenerateClick = () => {
    dispatch(fetchRandomImages({}));
    handleOpen();
  };

    /**
   * @TODO These three handlers are pretty similar.
   * They each update a specific piece of a choice object: breed, sub-breed,
   * or image count.
   */
  const handleBreedChange = (e: SelectChangeEvent<number | null>, index: number) => {
    dispatch(updateChoice({
      index,
      key: 'breed',
      value: e.target.value
    }));
  };

  const handleSubBreedChange = (e: SelectChangeEvent<number | null>, index: number) => {
    dispatch(updateChoice({
      index,
      key: 'subBreed',
      value: e.target.value
    }));
  };

  const handleImageCountChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    dispatch(updateChoice({
      index,
      key: 'imageCount',
      value: e.target.value
    }));
  }

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
            handleBreedChange={handleBreedChange}
            subBreeds={subBreeds}
            subBreedValue={rowChoice.subBreed}
            handleSubBreedChange={handleSubBreedChange}
            imageCount={rowChoice.imageCount}
            handleImageCountChange={handleImageCountChange}
          />
        );
      })}
      <Button
        className="DogForm-button"
        onClick={handleAddClick}
        variant="contained"
      >
        +
      </Button>
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
