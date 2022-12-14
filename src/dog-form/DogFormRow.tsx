import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DogFormRowProps } from '../types';
import './DogFormRow.css';

const DogFormRow = ({
  index,
  breeds,
  breedValue,
  handleBreedChange,
  subBreeds,
  subBreedValue,
  handleSubBreedChange,
  imageCount = 1,
  handleImageCountChange
}: DogFormRowProps): JSX.Element => {
  // Assorted values for the select dropdown labels.
  const breedLabelId = `breed-label-${index}`;
  const breedLabel = `Breed #${index}`;
  const subBreedLabelId = `sub-breed-label-${index}`;
  const subBreedLabel = (subBreeds.length === 0) ? 'No sub-breeds' : `Sub-breed #${index}`;

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
          value={(breedValue !== null) ? breedValue : ""}
          label={breedLabel}
          onChange={(e) => handleBreedChange(e, index)}
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
          value={(subBreedValue !== null) ? subBreedValue : ""}
          label={subBreedLabel}
          onChange={(e) => handleSubBreedChange(e, index)}
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
        onChange={(e) => handleImageCountChange(e, index)}
      />
    </div>
  )
};

export default DogFormRow;
