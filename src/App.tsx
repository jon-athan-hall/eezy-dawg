import { useEffect, useState } from 'react';
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { fetchAllBreeds } from './dog-form/dogFormSlice';
import DogForm from './dog-form/DogForm';
import DogGrid from './dog-grid/DogGrid';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllBreeds());
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <div className="App">
      <h1>Dog Poster Generator</h1>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Dog Image Poster"
        aria-describedby="Grid of random dog images generated by dog breed selections made in the dog form."
      >
        <Box className="App-box">
          <DogGrid />
        </Box>
      </Modal>
      <DogForm handleOpen={handleOpen} />
    </div>
  );
}

export default App;
