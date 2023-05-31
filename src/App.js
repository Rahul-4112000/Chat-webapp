import './App.css';
import Login from './Login/Login';

import { Provider } from 'react-redux';
import store from './Redux/Store/Store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';


function App() {


  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/' element={<Login/>} />
          </Routes>
        </Router>
      </div>
    </Provider>

  );
}

export default App;
