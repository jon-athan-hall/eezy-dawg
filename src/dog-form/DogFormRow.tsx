import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateChoice } from './dogFormSlice';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import './DogFormRow.css';

interface DogFormRowProps {
  index: number;
  breeds: string[];
  breedValue: number | null;
  subBreeds: string[];
  subBreedValue: number | null;
  imageCount: number;
};

const DogFormRow = ({
  index,
  breeds,
  breedValue,
  subBreeds,
  subBreedValue,
  imageCount = 1
}: DogFormRowProps): JSX.Element => {
  const dispatch = useDispatch();

  // Assorted values for the select dropdown labels.
  const breedLabelId = `breed-label-${index}`;
  const breedLabel = `Breed #${index}`;
  const subBreedLabelId = `sub-breed-label-${index}`;
  const subBreedLabel = (subBreeds.length === 0) ? 'No sub-breeds' : `Sub-breed #${index}`;

  /**
   * @TODO These three handlers are pretty similar.
   * They each update a specific piece of a choice object: breed, sub-breed,
   * or image count.
   */
  const handleBreedChange = (e: SelectChangeEvent<number | null>) => {
    dispatch(updateChoice({
      index,
      key: 'breed',
      value: e.target.value
    }));
  };

  const handleSubBreedChange = (e: SelectChangeEvent<number | null>) => {
    dispatch(updateChoice({
      index,
      key: 'subBreed',
      value: e.target.value
    }));
  };

  const handleImageCountChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateChoice({
      index,
      key: 'imageCount',
      value: e.target.value
    }));
  }

  /**
   * Each breed option's value is the index of the breed
   * in the big breed array that's passed in as a prop.
   */
  const breedMenuItems = breeds.map((breed, i) => (
    <MenuItem key={i} value={i}>{breed}</MenuItem>
  ));

  const subBreedMenuItems = subBreeds.map((subBreed, i) => (
    <MenuItem key={i} value={i}>{subBreed}</MenuItem>
  ));

  return (
    <div className="DogFormRow">
      <FormControl className="DogFormRow-control">
        <InputLabel id={breedLabelId}>{breedLabel}</InputLabel>
        <Select
          autoWidth={true}
          labelId={breedLabelId}
          id={`breed-select-${index}`}
          value={breedValue ? breedValue : ''}
          label={breedLabel}
          onChange={(e) => handleBreedChange(e)}
        >
          {breedMenuItems}
        </Select>
      </FormControl>

      <FormControl className="DogFormRow-control">
        <InputLabel id={subBreedLabelId}>{subBreedLabel}</InputLabel>
        <Select
          autoWidth={true}
          disabled={subBreeds.length === 0}
          labelId={subBreedLabelId}
          id={`sub-breed-select-${index}`}
          value={subBreedValue ? subBreedValue : ''}
          label={subBreedLabel}
          onChange={(e) => handleSubBreedChange(e)}
        >
          {subBreedMenuItems}
        </Select>
      </FormControl>

      <TextField
        className="DogFormRow-control"
        id={`image-count-${index}`}
        value={imageCount}
        label="Image count"
        type="number"
        onChange={(e) => handleImageCountChange(e)}
      />
    </div>
  )
};

export default DogFormRow;
