export interface DogFormRowProps {
  index: number;
  breeds: string[];
  breedValue: number | null;
  subBreeds: string[];
  subBreedValue: number | null;
  imageCount: number;
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
