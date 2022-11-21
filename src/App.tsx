import { Provider } from 'react-redux';
import store from './store';

import DogForm from './form/DogForm';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DogForm />
      </div>
    </Provider>
  );
}

export default App;
