import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import Home from './pages/home'
// import Navbar from './components/navbar'
import login from './pages/Login'

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            <Route path='/' element={<Home />} />
          </Routes> 
        </div>
      </BrowserRouter>    
    </div>
  );
}


export default App;
