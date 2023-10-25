import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from './slider';
import "./home.css"
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const buttonClick = (text) => {
    navigate(`/${text}`)
    ;}

    let cards = [
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/basketball.jpg" text={"Basketball"} onClick={buttonClick}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/cricket.jpg" text={"Cricket"} onClick={buttonClick}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/football.jpg" text={"Football"} onClick={buttonClick}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/badminton.jpg" text={"Badminton"} onClick={buttonClick} />
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/volleyball.jpeg" text={"Volleyball"} onClick={buttonClick}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/tabletennis.jpg" text={"Tabletennis"} onClick={buttonClick}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/tennis.webp" text={"Tennis"} onClick={buttonClick}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/chess.jpg" text={"Chess"} onClick={buttonClick}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/carrom.webp" text={"Carrom"} onClick={buttonClick}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/squash.webp" text={"Squash"} onClick={buttonClick}/>
          )
        },
      ];
  return (
    <div className="home-container">
      <Carousel
        height="100px"
        cards={cards}
        width="50%"
        offset={2}
        showArrows={false}
        // className="home-container"
      />
    </div>
  );
}

export default Home;
