import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/navbar'
import login from './pages/Login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='/'
            element={<Home />}
            />
          </Routes>
          <Routes>
            <Route path='/Login'
            element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
