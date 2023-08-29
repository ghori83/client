import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedPage from './components/protectedPage';
import Spinner from './components/Spinner' 
import { useSelector } from 'react-redux'
import Profile from './pages/profile';


function App() {
 
  const {loading} = useSelector((state) => state.loaders);
  return (
    <>
    {loading && <Spinner />}
    <BrowserRouter>
    <Routes>
    <Route path="/" element ={<ProtectedPage><Home/> </ProtectedPage> } />
    <Route path="/profile" element ={<ProtectedPage><Profile/> </ProtectedPage> } />


    <Route path="/Login" element ={<Login/>} />
    <Route path="/Register" element ={<Register/>} />

    </Routes>
     
    
    </BrowserRouter>
    
    
    </>
  );
}

export default App;
