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
        {
          key: uuidv4(),
          content: (
            <Card imagen="./assets/squash.webp" text={"Squash"}/>
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
