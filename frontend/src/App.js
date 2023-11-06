// import './App.css'
// import Home from "./components/Home/home"
// import Login from "./components/LoginPage/loginpage"
// import Signup from "./components/SignUpPage/signuppage"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Basketball from "./components/BasketBall/basketball"
// // import Badminton from "./components/Badminton/badminton"
// // import Carrom from "./components/Carrom/carrom"
// // import Chess from "./components/Chess/chess"
// import Cricket from "./components/Cricket/cricket"
// // import Football from "./components/Football/football"
// // import Squash from "./components/Squash/squash"
// // import TableTennis from "./components/TableTennis/tabletennis"
// // import Tennis from "./components/Tennis/tennis"
// // import VolleyBall from "./components/VolleyBall/volleyball"
// import Developers from "./components/Developers/developers"
// // import AnotherComponent from './components/AnotherComponent/AnotherComponent';
// // import Api from './state/api';
// import AnotherComponent from "./components/AnotherComponent/AnotherComponent";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login/>}/>
//           <Route path="/signup" element={<Signup/>}/>
//           <Route path="/home" element={<Home/>}/>

//           <Route path="/Cricket" element={<Cricket/>}/>

//           <Route path="/Developers" element={<Developers/>}/>
//           <Route path="/Sports" element={<AnotherComponent/>}/>

//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import './App.css';
import Home from "./components/Home/home";
import Login from "./components/LoginPage/loginpage";
import Signup from "./components/SignUpPage/signuppage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Developers from "./components/Developers/developers";
import AnotherComponent from "./components/AnotherComponent/AnotherComponent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/Cricket" element={<Cricket />} /> */}
          <Route path="/Developers" element={<Developers />} />
          {/* Updated route to accept parameters */}
          <Route path="/Sports/:title" element={<AnotherComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
