import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import DogFormRow from './DogFormRow';
import { DogFormRowProps } from '../types';

describe('DogFormRow', () => {

  let basicProps: DogFormRowProps;

  beforeEach(() => {
    basicProps = {
      index: 1,
      breeds: ['setter', 'boxer', 'doberman'],
      breedValue: 0,
      subBreeds: ['english', 'gordon', 'irish'],
      subBreedValue: null,
      imageCount: 1 
    };
  });

  it('displays the breed select element', () => {
    renderWithProviders(<DogFormRow {...basicProps} />);
    expect(screen.getByLabelText(`Breed #${basicProps.index}`)).toBeInTheDocument();
  });

  it('displays the sub-breed select element', () => {
    renderWithProviders(<DogFormRow {...basicProps} />);
    expect(screen.getByLabelText(`Sub-breed #${basicProps.index}`)).toBeInTheDocument();
  });

  it('displays the image count input element', () => {
    renderWithProviders(<DogFormRow {...basicProps} />);
    expect(screen.getByLabelText('Image count')).toBeInTheDocument();
  });

});

describe('DogFormRow without sub-breed data', () => {

  let noSubBreedProps: DogFormRowProps;

  beforeEach(() => {
    noSubBreedProps = {
      index: 1,
      breeds: ['setter', 'boxer', 'doberman'],
      breedValue: 0,
      subBreeds: [],
      subBreedValue: null,
      imageCount: 1 
    };
  });

  it('displays the correct sub-breed label', () => {
    renderWithProviders(<DogFormRow {...noSubBreedProps} />);
    expect(screen.queryByLabelText(`Sub-breed #${noSubBreedProps.index}`)).not.toBeInTheDocument();
    expect(screen.getByLabelText('No sub-breeds')).toBeInTheDocument();
  });

  /*
  it('disables the sub-breed select element', () => {
    renderWithProviders(<DogFormRow {...noSubBreedProps} />);
    const subBreedSelect = screen.getByTestId('sub-breeds-select');
    expect(subBreedSelect).toHaveAttribute('disabled');
  });
  */

});
