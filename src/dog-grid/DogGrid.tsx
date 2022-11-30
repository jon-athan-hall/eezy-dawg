import { useSelector } from 'react-redux';
import { selectImages } from '../dog-form/dogFormSlice';
import { shuffle } from '../utils';
import './DogGrid.css';

const DogGrid = () => {
  const images = useSelector(selectImages);
  let shuffledImages = shuffle([...images]);

  return (
    <div className="DogGrid">
      {shuffledImages.map((imageUrl, index) => (
        <img className="DogGrid-image" key={index} src={imageUrl} />
      ))}
    </div>
  );
};

export default DogGrid;
