import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { RowChoice } from '../types';
import dogAPI from '../dogAPI';

export interface DogFormState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  breedsDictionary: {
    [key: string]: string[] | never[];
  };
  breeds: string[] | never[];
  choices: RowChoice[];
  error: string | null | undefined;
};

export const fetchAllBreeds = createAsyncThunk('dog/fetchAll',
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

const initialState: DogFormState = {
  status: 'idle',
  breedsDictionary: {"affenpinscher":[],"african":[],"airedale":[],"akita":[],"appenzeller":[],"australian":["shepherd"],"basenji":[],"beagle":[],"bluetick":[],"borzoi":[],"bouvier":[],"boxer":[],"brabancon":[],"briard":[],"buhund":["norwegian"],"bulldog":["boston","english","french"],"bullterrier":["staffordshire"],"cattledog":["australian"],"chihuahua":[],"chow":[],"clumber":[],"cockapoo":[],"collie":["border"],"coonhound":[],"corgi":["cardigan"],"cotondetulear":[],"dachshund":[],"dalmatian":[],"dane":["great"],"deerhound":["scottish"],"dhole":[],"dingo":[],"doberman":[],"elkhound":["norwegian"],"entlebucher":[],"eskimo":[],"finnish":["lapphund"],"frise":["bichon"],"germanshepherd":[],"golden":[],"greyhound":["italian"],"groenendael":[],"havanese":[],"hound":["afghan","basset","blood","english","ibizan","plott","walker"],"husky":[],"keeshond":[],"kelpie":[],"komondor":[],"kuvasz":[],"labradoodle":[],"labrador":[],"leonberg":[],"lhasa":[],"malamute":[],"malinois":[],"maltese":[],"mastiff":["bull","english","tibetan"],"mexicanhairless":[],"mix":[],"mountain":["bernese","swiss"],"newfoundland":[],"otterhound":[],"ovcharka":["caucasian"],"papillon":[],"pekinese":[],"pembroke":[],"pinscher":["miniature"],"pitbull":[],"pointer":["german","germanlonghair"],"pomeranian":[],"poodle":["medium","miniature","standard","toy"],"pug":[],"puggle":[],"pyrenees":[],"redbone":[],"retriever":["chesapeake","curly","flatcoated","golden"],"ridgeback":["rhodesian"],"rottweiler":[],"saluki":[],"samoyed":[],"schipperke":[],"schnauzer":["giant","miniature"],"segugio":["italian"],"setter":["english","gordon","irish"],"sharpei":[],"sheepdog":["english","shetland"],"shiba":[],"shihtzu":[],"spaniel":["blenheim","brittany","cocker","irish","japanese","sussex","welsh"],"springer":["english"],"stbernard":[],"terrier":["american","australian","bedlington","border","cairn","dandie","fox","irish","kerryblue","lakeland","norfolk","norwich","patterdale","russell","scottish","sealyham","silky","tibetan","toy","welsh","westhighland","wheaten","yorkshire"],"tervuren":[],"vizsla":[],"waterdog":["spanish"],"weimaraner":[],"whippet":[],"wolfhound":["irish"]},
  breeds: [],
  choices: [{
    breed: null,
    subBreed: null,
    imageCount: 1
  }],
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
