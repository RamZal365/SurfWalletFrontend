import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import Character from "./components/Character.jsx";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='personaje/:id' element={<Character></Character>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
