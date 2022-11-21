import { useState } from 'react';
import DogFormRow from './DogFormRow';

interface BreedDictionary {
  [key: string]: string[] | never[]
};

interface RowChoice {
  breed: number | undefined;
  subBreed: number | undefined;
  imageCount: number
};

const BREEDS_MESSAGE: BreedDictionary = {"affenpinscher":[],"african":[],"airedale":[],"akita":[],"appenzeller":[],"australian":["shepherd"],"basenji":[],"beagle":[],"bluetick":[],"borzoi":[],"bouvier":[],"boxer":[],"brabancon":[],"briard":[],"buhund":["norwegian"],"bulldog":["boston","english","french"],"bullterrier":["staffordshire"],"cattledog":["australian"],"chihuahua":[],"chow":[],"clumber":[],"cockapoo":[],"collie":["border"],"coonhound":[],"corgi":["cardigan"],"cotondetulear":[],"dachshund":[],"dalmatian":[],"dane":["great"],"deerhound":["scottish"],"dhole":[],"dingo":[],"doberman":[],"elkhound":["norwegian"],"entlebucher":[],"eskimo":[],"finnish":["lapphund"],"frise":["bichon"],"germanshepherd":[],"golden":[],"greyhound":["italian"],"groenendael":[],"havanese":[],"hound":["afghan","basset","blood","english","ibizan","plott","walker"],"husky":[],"keeshond":[],"kelpie":[],"komondor":[],"kuvasz":[],"labradoodle":[],"labrador":[],"leonberg":[],"lhasa":[],"malamute":[],"malinois":[],"maltese":[],"mastiff":["bull","english","tibetan"],"mexicanhairless":[],"mix":[],"mountain":["bernese","swiss"],"newfoundland":[],"otterhound":[],"ovcharka":["caucasian"],"papillon":[],"pekinese":[],"pembroke":[],"pinscher":["miniature"],"pitbull":[],"pointer":["german","germanlonghair"],"pomeranian":[],"poodle":["medium","miniature","standard","toy"],"pug":[],"puggle":[],"pyrenees":[],"redbone":[],"retriever":["chesapeake","curly","flatcoated","golden"],"ridgeback":["rhodesian"],"rottweiler":[],"saluki":[],"samoyed":[],"schipperke":[],"schnauzer":["giant","miniature"],"segugio":["italian"],"setter":["english","gordon","irish"],"sharpei":[],"sheepdog":["english","shetland"],"shiba":[],"shihtzu":[],"spaniel":["blenheim","brittany","cocker","irish","japanese","sussex","welsh"],"springer":["english"],"stbernard":[],"terrier":["american","australian","bedlington","border","cairn","dandie","fox","irish","kerryblue","lakeland","norfolk","norwich","patterdale","russell","scottish","sealyham","silky","tibetan","toy","welsh","westhighland","wheaten","yorkshire"],"tervuren":[],"vizsla":[],"waterdog":["spanish"],"weimaraner":[],"whippet":[],"wolfhound":["irish"]};
const BREEDS = Object.keys(BREEDS_MESSAGE);

const DogForm = (): JSX.Element => {
  const [rowChoices, setRowChoices] = useState<RowChoice[]>([{
    breed: 0,
    subBreed: 0,
    imageCount: 0
  }]);

  return (
    <form className="DogForm">
      {rowChoices.map((rowChoice, index) => {
        /**
         * The sub-breeds select should be empty if no breed has been selected yet.
         * Otherwise, use the breed value to get the actual breed string, then use that
         * breed string with the dictionary to get the sub-breed array.
         */
        const subBreeds = (rowChoice.breed === undefined) ? [] : BREEDS_MESSAGE[BREEDS[rowChoice.breed]];

        return (
          <DogFormRow
            key={index}
            index={index}
            breeds={BREEDS}
            breedValue={rowChoice.breed}
            subBreeds={subBreeds}
            subBreedValue={rowChoice.subBreed}
            imageCount={rowChoice.imageCount}
          />
        );
      })}
    </form>
  );
};

export default DogForm;
