import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './app.css';
import Home from './pages/home'
import Navbar from './components/navbar'
import login from './pages/Login'

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {/* {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }  */}

      <Home/>     
    </div>
  );
}


export default App;
