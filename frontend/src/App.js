import './App.css'
import Home from "./components/Home/home"
import Login from "./components/LoginPage/loginpage"
import Signup from "./components/SignUpPage/signuppage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Basketball from "./components/BasketBall/basketball"
import Badminton from "./components/Badminton/badminton"
import Carrom from "./components/Carrom/carrom"
import Chess from "./components/Chess/chess"
import Cricket from "./components/Cricket/cricket"
import Football from "./components/Football/football"
import Squash from "./components/Squash/squash"
import TableTennis from "./components/TableTennis/tabletennis"
import Tennis from "./components/Tennis/tennis"
import VolleyBall from "./components/VolleyBall/volleyball"
import Developers from "./components/Developers/developers"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          {/* <Route path="/api/:Sports" element={<Home/>}/> */}
          <Route path="/Basketball" element={<Basketball/>}/>
          <Route path="/Badminton" element={<Badminton/>}/>
          <Route path="/Carrom" element={<Carrom/>}/>
          <Route path="/Chess" element={<Chess/>}/>
          <Route path="/Cricket" element={<Cricket/>}/>
          <Route path="/Football" element={<Football/>}/>
          <Route path="/Squash" element={<Squash/>}/>
          <Route path="/TableTennis" element={<TableTennis/>}/>
          <Route path="/VolleyBall" element={<VolleyBall/>}/>
          <Route path="/Tennis" element={<Tennis/>}/>
          <Route path="/Developers" element={<Developers/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;