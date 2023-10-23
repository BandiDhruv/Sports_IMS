import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from './slider';
import "./home.css"

function Home() {
    let cards = [
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/basketball.jpg" text={"Basketball"}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/cricket.jpg" text={"Cricket"}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/football.jpg" text={"Football"}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/badminton.jpg" text={"Badminton"} />
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/volleyball.jpeg" text={"Volleyball"}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/tabletennis.jpg" text={"Tabletennis"}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/tennis.webp" text={"Tennis"}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/chess.jpg" text={"Chess"}/>
          )
        },
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/carrom.webp" text={"Carrom"}/>
          )
        },
      ];
  return (
    <div className="home-container">
    
      <Carousel
        cards={cards}
        // height="10rem"
        width="100%"
        margin="30rem auto"
        offset={200}
        showArrows={false}
      />
    </div>
  );
}

export default Home;
