import { useSelector } from 'react-redux';
import { selectImages } from '../dog-form/dogFormSlice';
import './DogGrid.css';

const DogGrid = () => {
  const images = useSelector(selectImages);

  return (
    <div className="DogGrid">
      {images.map((imageUrl, index) => (
        <img className="DogGrid-image" key={index} src={imageUrl} />
      ))}
    </div>
  );
};

export default DogGrid;
