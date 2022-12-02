import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

type DogFormSelectHandler = (e: SelectChangeEvent<number | null>, index: number) => void;
type DogFormInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;

export interface DogFormRowProps {
  index: number;
  breeds: string[];
  breedValue: number | null;
  handleBreedChange: DogFormSelectHandler;
  subBreeds: string[];
  subBreedValue: number | null;
  handleSubBreedChange: DogFormSelectHandler;
  imageCount: number;
  handleImageCountChange: DogFormInputHandler;
};

export interface RowChoice {
  breed: number | null;
  subBreed: number | null;
  imageCount: number;
};

export interface ImagesPayload {
  message: string[];
  status: string;
};
