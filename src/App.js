import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import About from './Components/About';
import Adduser from './Components/Adduser';
import UserInfo from './Components/UserInfo';



function App() {
  return (

    <BrowserRouter>
    
    <Routes>
      <Route  index element={<Home />}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/adduser' element={<Adduser />} />
      <Route path='/userinfo' element={<UserInfo />} />
    </Routes>

    </BrowserRouter>


  

  );
}

export default App;
