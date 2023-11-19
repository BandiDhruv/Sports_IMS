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
// import './App.css';
// import Home from "./components/Home/home";
// import Login from "./components/LoginPage/loginpage";
// import Signup from "./components/SignUpPage/signuppage";
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Developers from "./components/Developers/developers";
// import AnotherComponent from "./components/AnotherComponent/AnotherComponent";
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// // const navigate=useNavigate();

// function App() {
//   const [auth,setAuth]=useState(false)
//   async function authF(){
//     try {
//       const res = await axios.get("http://localhost:8000/api");
//       if (res.data.message === "exist") {
//         setAuth(true);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("oops you are not logged in");
//       // Handle errors or set auth to false
//       setAuth(false);
//     }
//   }
//   useEffect(()=>{
//     authF()
//   },[])
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           {/* <Route path="/home" element={<Home />} />
//           <Route path="/Developers" element={<Developers />} />
//           <Route path="/Sports/:title" element={<AnotherComponent />} /> */}
// {auth ? (
//             <>
//               <Route path="/home" element={<Home />} />
// <Route path="/Developers" element={<Developers />} />
// <Route path="/Sports/:title" element={<AnotherComponent />} />
//               <Navigate to="/home" /> {/* Redirect to Home if authenticated */}
//             </>
//           ) : (
//             <Navigate to="/" /> {/* Redirect to Login if not authenticated */}
//           )}
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
// import './App.css';
// import Home from "./components/Home/home";
// import Login from "./components/LoginPage/loginpage";
// import Signup from "./components/SignUpPage/signuppage";
// import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Developers from "./components/Developers/developers";
// import AnotherComponent from "./components/AnotherComponent/AnotherComponent";
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [auth, setAuth] = useState(false);

//   async function authF() {
//     try {
//       const res = await axios.get("http://localhost:8000/api");
//       if (res.data.message === "exist") {
//         setAuth(true);
//       }
//     } catch (error) {
//       console.error("error:", error);
//       alert("Oops, you are not logged in");
//       // setAuth(false);
//     }
//   }

//   useEffect(() => {
//     authF();
//   },[]);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           {auth && (
//             <>
//               <Route path="/home" element={<Home />} />
//               {/* Other authenticated routes */}
//               <Route path="/Developers" element={<Developers />} />
//               <Route path="/Sports/:title" element={<AnotherComponent />} />
//               {/* Add more authenticated routes here */}
//             </>
//           )}
//         </Routes>
//       </div>
//     </Router>
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
import { useEffect, useState } from 'react';
import axios from 'axios';
import Error from '../src/components/ErrorPage/Error'

function App() {
  const [auth, setAuth] = useState(false);

  async function authF() {
    try {
      const res = await axios.get("http://localhost:8000/api");
      if (res.data.message === "exist") {
        setAuth(true);
      }
    } catch (error) {
      console.error("error:", error);
      alert("Oops, you are not logged in");
      // setAuth(false);
    }
  }

  useEffect(() => {
    authF();
  },[]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setAuth={setAuth}/>} />
          <Route path="/signup" element={<Signup />} />
          {auth && <Route path="/home" element={<Home />} />}
          {auth && <Route path="/Developers" element={<Developers />} />}
          {auth && <Route path="/Sports/:title" element={<AnotherComponent />} />}
          {/* Add more authenticated routes here */}
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
