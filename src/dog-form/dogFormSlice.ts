import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  ImagesPayload,
  RowChoice
} from '../types';
import dogAPI from '../dogAPI';

export interface DogFormState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  breedsDictionary: {
    [key: string]: string[] | never[];
  };
  breeds: string[] | never[];
  choices: RowChoice[];
  images: string[];
  error: string | null | undefined;
};

export const fetchAllBreeds = createAsyncThunk('dog/fetchBreeds',
  async () => {
    try {
      const data = await dogAPI.getAllBreeds();
      return data;
    } catch (e) {
      // @TODO Build a better error return here.
      console.error(e);
      throw e;
    }
  }
);

export const fetchRandomImages = createAsyncThunk<ImagesPayload[], {}, { state: RootState }>('dog/fetchImages',
  async ({}, thunkAPI) => {
    const { dogForm } = thunkAPI.getState();
    const { breedsDictionary, breeds, choices } = dogForm;

    try {
      const data = await Promise.all(
        /**
         * Loop through all choices, and get the actual string values of the breed form choices,
         * using the breeds array and the breeds dictionary. Send these values along to the API
         * method for the random images.
         */
        choices.map(async (choice) => {
          if (choice.breed === null) return;

          const breedText = breeds[choice.breed];
          const subBreedText = choice.subBreed !== null ? breedsDictionary[breedText][choice.subBreed] : null;

          const imageData = await dogAPI.getRandomImages(breedText, subBreedText, choice.imageCount);
          return imageData;
        })
      );
      return data;
    } catch (e) {
      // @TODO Build a better error return here too.
      console.error(e);
      throw e;
    }
  }
);

const initialState: DogFormState = {
  status: 'idle',
  breedsDictionary: {},
  breeds: [],
  choices: [{
    breed: null,
    subBreed: null,
    imageCount: 1
  }],
  images: [],
  error: null
};

export const dogFormSlice = createSlice({
  name: 'dogForm',
  initialState,
  reducers: {
    /**
     * Making fresh copies isn't necessary anymore thanks to Immer
     * under the hood, but I still like to do it this way sometimes.
     */
    loadDictionary: (state, action) => {
      return {
        ...state,
        breedsDictionary: action.payload
      }
    },
    buildBreeds: (state) => {
      return {
        ...state,
        breeds: Object.keys(state.breedsDictionary)
      }
    },
    updateChoice: (state, action) => {
      const { index, key, value } = action.payload;

      /**
       * Find the choice object based on the payload's index.
       * Then update the specific key value pair.'
       * 
       * For example, one dispatch may update the third form row
       * to have a "british" sub-breed.
       * 
       * That payload would look like:
       * {
       *   index: 3,
       *   key: 'subBreed',
       *   value: 'british'
       * }
       */
      const choices = state.choices.map((choice, i) => {
        if (i === index) {
          const newChoice = { ...choice };
          newChoice[key as keyof RowChoice] = value;
          return newChoice;
        } else {
          return choice;
        }
      });

      return {
        ...state,
        choices
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBreeds.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAllBreeds.fulfilled, (state, action) => {
      state.breedsDictionary = action.payload.message;
      state.breeds = Object.keys(action.payload.message);
    });
    builder.addCase(fetchAllBreeds.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(fetchRandomImages.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRandomImages.fulfilled, (state, action) => {
      let images: string[] = [];
      action.payload.map((imagesPayload) => images.push(...imagesPayload.message));
      state.images = images;
    });
    builder.addCase(fetchRandomImages.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export const selectBreedsDictionary = (state: RootState) => state.dogForm.breedsDictionary;
export const selectBreeds = (state: RootState) => state.dogForm.breeds;
export const selectChoices = (state: RootState) => state.dogForm.choices;

export const {
  loadDictionary,
  buildBreeds,
  updateChoice
} = dogFormSlice.actions;

export default dogFormSlice.reducer;
