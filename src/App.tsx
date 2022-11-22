import { useEffect } from 'react';
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';
import { fetchAllBreeds } from './dog-form/dogFormSlice';
import DogForm from './dog-form/DogForm';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllBreeds());
  }, []);
  
  return (
    <div className="App">
      <DogForm />
    </div>
  );
}

export default App;
