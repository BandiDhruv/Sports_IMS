import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from './slider';
import "./home.css"
import { Link, useNavigate} from "react-router-dom";
import Navbar from "../Navbar/navbar"
import { MenuItems } from "../Navbar/MenuItems";
// import { useEffect } from "react";
// import jwt from "jsonwebtoken"


function Home() {
  // const history=useNavigate();
  // useEffect(() => {
  //   const token=localStorage.getItem("token");
  //   if(token){
  //     const user =jwt.decode(token);
  //     if(!user)
  //     {
  //       // localStorage.removeItem("token");
  //       history('/');
  //     }
  //     else {
  //       console.log("welcome to home page");
  //     }
  //   }
  // })
  const navigate = useNavigate();
  const buttonClick = (text) => {
    console.log(text);
    navigate(`/Sports/${text}`);
    ;}

    let cards = [
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/basketball.jpg" text={"Basketball"} onClick={() => buttonClick("Basketball")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/cricket.jpg" text={"Cricket"} onClick={() => buttonClick("Cricket")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/football.jpg" text={"Football"} onClick={() => buttonClick("Football")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/badminton.jpg" text={"Badminton"} onClick={() => buttonClick("Badminton")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/volleyball.jpeg" text={"Volleyball"} onClick={() => buttonClick("Volleyball")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/tabletennis.jpg" text={"Tabletennis"} onClick={() => buttonClick("Tabletennis")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/tennis.webp" text={"Tennis"} onClick={() => buttonClick("Tennis")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/chess.jpg" text={"Chess"} onClick={() => buttonClick("Chess")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/carrom.webp" text={"Carrom"} onClick={() => buttonClick("Carrom")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/squash.webp" text={"Squash"} onClick={() => buttonClick("Squash")} />
        )
      },
    ];
    
    
  return (
    <div className="home-container">
      <div id="navbar">
      <Navbar />
      </div>
      <div className="home-div">
        <div className="left">
          <div className="left-panel-heading">Select Sports</div>
          <div className="left-panel-contents"  >
          {MenuItems.map((item)=>{
            return(
              <li key={item.title}  className="left-panel-list" >
                <Link className="left-panel-link" to={`/Sports/${item.title}`} >{item.title}</Link>
              </li>
            )
          })}
          </div>
        </div>
        <div className="right">
          <Carousel
            height="90%"
            cards={cards}
            width="75%"
            offset={2}
            showArrows={false}
            />
        </div>
      </div>
      </div>
  );
}

export default Home;
