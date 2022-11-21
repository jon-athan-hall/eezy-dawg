import { ChangeEvent } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import './DogFormRow.css';

interface DogFormRowProps {
  index: number;
  breeds: string[];
  breedValue: number | undefined;
  subBreeds: string[];
  subBreedValue: number | undefined;
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
  const breedLabelId = `breed-label-${index}`;
  const breedLabel = `Breed #${index}`;
  const subBreedLabelId = `sub-breed-label-${index}`;
  const subBreedLabel = `Sub-breed #${index}`;

  const handleBreedChange = (e: SelectChangeEvent<number>) => {
    console.log('breed change');
    console.log('trigger Redux change: ', e);
  };

  // @TODO These two handlers are pretty similar.
  const handleSubBreedChange = (e: SelectChangeEvent<number>) => {
    console.log('sub-breed change');
    console.log('trigger Redux change', e);
  };

  const handleImageCountChange = (e: ChangeEvent) => {
    console.log('image count change');
    console.log('trigger Redux change:', e);
  }

  /**
   * Each breed option's value is the index of the breed
   * in the big breed array that's passed in as a prop.
   */
  const breedMenuItems = breeds.map((breed, index) => (
    <MenuItem key={index} value={index}>{breed}</MenuItem>
  ));

  const subBreedMenuItems = subBreeds.map((subBreed, index) => (
    <MenuItem key={index} value={index}>{subBreed}</MenuItem>
  ));

  return (
    <div className="DogFormRow">
      <FormControl className="DogFormRow-control">
        <InputLabel id={breedLabelId}>{breedLabel}</InputLabel>
        <Select
          autoWidth={true}
          labelId={breedLabelId}
          id={`breed-select-${index}`}
          value={breedValue}
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
          value={subBreedValue}
          label={subBreedLabel}
          onChange={(e) => handleSubBreedChange(e)}
        >
          {subBreedMenuItems}
        </Select>
      </FormControl>

      <TextField
        className="DogFormRow-control"
        id={`image-count-${index}`}
        label="Image count"
        type="number"
        onChange={(e) => handleImageCountChange(e)}
      />
    </div>
  )
};

export default DogFormRow;
