export interface RowChoice {
  breed: number | null;
  subBreed: number | null;
  imageCount: number;
};

export interface ImagesPayload {
  message: string[];
  status: string;
};
