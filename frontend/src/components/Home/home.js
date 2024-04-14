import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from './slider';
import "./home.css"
import { Link, useNavigate} from "react-router-dom";
import Navbar from "../Navbar/navbar"
import { MenuItems } from "../Navbar/MenuItems";

function Home() {

  const navigate = useNavigate();
  const buttonClick = (text) => {
    console.log(text);
    navigate(`/Sports/${text}`);
    ;}

    let cards = [
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/basketball.jpg" text={"Basketball"} paragraph={"Basketball is a fast-paced team sport played between two teams, each aiming to score points by shooting a ball through the opponent's hoop. Players dribble, pass, and shoot the ball to outscore their rivals within the allotted time."} onClick={() => buttonClick("Basketball")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/cricket.jpg" text={"Cricket"} paragraph={"Cricket is a strategic bat-and-ball game played between two teams, each aiming to score runs and dismiss the opposing team's players. It involves batting, bowling, and fielding, played on an oval-shaped field. "} onClick={() => buttonClick("Cricket")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/football.jpg" text={"Football"} paragraph={"Football, known as soccer in some regions, is a globally beloved sport played between two teams, each aiming to score goals by kicking a ball into the opponent's net. It's played on a rectangular field with two goals at opposite ends."} onClick={() => buttonClick("Football")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/badminton.jpg" text={"Badminton"} paragraph={"Badminton is a racket sport played either between two opposing players (singles) or two pairs (doubles) on a court divided by a net. Players use lightweight rackets to hit a shuttlecock (birdie) back and forth over the net, aiming to land it within the opponent's side of the court."} onClick={() => buttonClick("Badminton")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/volleyball.jpeg" text={"Volleyball"} paragraph={"Volleyball is a dynamic team sport played between two teams, each aiming to score points by grounding a ball on the opponent's court. Players use their hands or arms to hit a ball over a net, rallying it back and forth until one team fails to return the ball or commits a fault"} onClick={() => buttonClick("Volleyball")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/tabletennis.jpg" text={"Tabletennis"} paragraph={"Table tennis, also known as ping-pong, is a fast-paced indoor racket sport played on a table divided by a net. Players use small, lightweight paddles to hit a lightweight ball back and forth over the net."} onClick={() => buttonClick("Tabletennis")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/tennis.webp" text={"Tennis"} paragraph={"Tennis is a racket sport played individually against a single opponent or between two teams of two players each. It's played on a rectangular court with a net in the center, where players use rackets to hit a ball back and forth, aiming to land it within the opponent's court while preventing the opponent from doing the same."} onClick={() => buttonClick("Tennis")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/chess.jpg" text={"Chess"} paragraph={"Chess is a strategic board game played between two players, each controlling a set of pieces on a checkered board divided into 64 squares.Each player strategically moves their pieces, including pawns, knights, bishops, rooks, a queen, and a king, adhering to specific movement rules for each piece."} onClick={() => buttonClick("Chess")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/carrom.webp" text={"Carrom"} paragraph={"Carrom is a tabletop game that involves flicking small discs known as carrom men into pockets placed in each corner of a square board. Players take turns using a striker to shoot their carrom men into the pockets while aiming to pocket all their pieces before their opponent does."} onClick={() => buttonClick("Carrom")} />
        )
      },
      {
        key: uuidv4(),
        content: (
          <Card imagen="./assets/squash.webp" text={"Squash"} paragraph={"Squash is a high-paced racket sport played in an enclosed court between two players (singles) or four players (doubles). Players use a small, hollow rubber ball and rackets to hit the ball against the walls of the court, aiming to outmaneuver their opponent by hitting the ball strategically to make it difficult to return."} onClick={() => buttonClick("Squash")} />
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

