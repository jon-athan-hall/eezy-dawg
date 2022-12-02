import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import DogFormRow from './DogFormRow';
import { DogFormRowProps } from '../types';

describe('DogFormRow', () => {

  let basicProps: DogFormRowProps;

  beforeEach(() => {
    jest.resetAllMocks();

    basicProps = {
      index: 1,
      breeds: ['setter', 'boxer', 'doberman'],
      breedValue: 0,
      handleBreedChange: jest.fn(),
      subBreeds: ['english', 'gordon', 'irish'],
      subBreedValue: null,
      handleSubBreedChange: jest.fn(),
      imageCount: 1,
      handleImageCountChange: jest.fn()
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

  it('triggers the correct event handler when a new breed option is clicked', () => {
    renderWithProviders(<DogFormRow {...basicProps} />);

    const breedSelect = screen.getByLabelText(`Breed #${basicProps.index}`);
    fireEvent.mouseDown(breedSelect);

    const listBox = within(screen.getByRole('listbox'));
    fireEvent.click(listBox.getByText(basicProps.breeds[1]));

    expect(breedSelect).toBeInTheDocument();
    expect(basicProps.handleBreedChange).toHaveBeenCalled();
  });

  it('does not trigger anything when the same breed option is clicked', () => {
    const selectedValue = 0;
    renderWithProviders(<DogFormRow {...basicProps} breedValue={selectedValue} />);

    const breedSelect = screen.getByLabelText(`Breed #${basicProps.index}`);
    fireEvent.mouseDown(breedSelect);

    const listBox = within(screen.getByRole('listbox'));
    fireEvent.click(listBox.getByText(basicProps.breeds[selectedValue]));

    expect(breedSelect).toBeInTheDocument();
    expect(basicProps.handleBreedChange).not.toHaveBeenCalled();
  });

  it('triggers the correct event handler when a new sub-breed option is clicked', () => {
    renderWithProviders(<DogFormRow {...basicProps} />);

    const subBreedSelect = screen.getByLabelText(`Sub-breed #${basicProps.index}`);
    fireEvent.mouseDown(subBreedSelect);

    const listBox = within(screen.getByRole('listbox'));
    fireEvent.click(listBox.getByText(basicProps.subBreeds[0]));

    expect(subBreedSelect).toBeInTheDocument();
    expect(basicProps.handleSubBreedChange).toHaveBeenCalled();
  });

  it('does not trigger anything when the same sub-breed option is clicked', () => {
    const selectedValue = 1;
    renderWithProviders(<DogFormRow {...basicProps} subBreedValue={selectedValue} />);

    const subBreedSelect = screen.getByLabelText(`Sub-breed #${basicProps.index}`);
    fireEvent.mouseDown(subBreedSelect);

    const listBox = within(screen.getByRole('listbox'));
    fireEvent.click(listBox.getByText(basicProps.subBreeds[selectedValue]));

    expect(subBreedSelect).toBeInTheDocument();
    expect(basicProps.handleSubBreedChange).not.toHaveBeenCalled();
  });

  it('triggers the correct event handler when image count value changes', () => {
    renderWithProviders(<DogFormRow {...basicProps} />);

    const imageCount = screen.getByLabelText(`Image count`);
    fireEvent.change(imageCount, { target: { value: '3' }});

    expect(imageCount).toBeInTheDocument();
    expect(basicProps.handleImageCountChange).toHaveBeenCalled();
  });

});

describe('DogFormRow without sub-breed data', () => {

  let noSubBreedProps: DogFormRowProps;

  beforeEach(() => {
    noSubBreedProps = {
      index: 1,
      breeds: ['setter', 'boxer', 'doberman'],
      breedValue: 0,
      handleBreedChange: jest.fn(),
      subBreeds: [],
      subBreedValue: null,
      handleSubBreedChange: jest.fn(),
      imageCount: 1 ,
      handleImageCountChange: jest.fn()
    };
  });

  it('displays the correct sub-breed label', () => {
    renderWithProviders(<DogFormRow {...noSubBreedProps} />);
    expect(screen.queryByLabelText(`Sub-breed #${noSubBreedProps.index}`)).not.toBeInTheDocument();
    expect(screen.getByLabelText('No sub-breeds')).toBeInTheDocument();
  });

});
