import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Surfboard from './components/Surfboards/Surfboard';
import Surfboards from './components/Surfboards/Surfboards';
import Wetsuit from './components/Wetsuits/Wetsuit';
import Wetsuits from './components/Wetsuits/Wetsuits';
import Spot from './components/Spots/Spot';
import Spots from './components/Spots/Spots';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}> </Route>
          {<Route path='/login' element={<Login></Login>}> </Route>}
          {<Route path='/signup' element={<SignUp></SignUp>}> </Route>}
          
          {/*Surfboards */}
          <Route path='/surfboard/:id' element={<Surfboard></Surfboard>}> </Route>
          <Route path='/surfboards' element={<Surfboards></Surfboards>}> </Route>

          {/*Wetsuits */}
          <Route path='/wetsuit/:id' element={<Wetsuit></Wetsuit>}> </Route>
          <Route path='/wetsuits' element={<Wetsuits></Wetsuits>}> </Route>

          {/*Spots */}
          <Route path='/spot/:id' element={<Spot></Spot>}> </Route>
          <Route path='/spots' element={<Spots></Spots>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
