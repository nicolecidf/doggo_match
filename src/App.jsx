import { useState, useEffect } from "react";
import Card from "./components/Card";
import shuffle from "./utilities/shuffle";
import Header from "./components/Header";
import YouWin from "./components/YouWin";
import useAppBadge from "./hooks/useAppBadge";

function App() {
  const [cards, setCards] = useState(shuffle); // Cards array from assets
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(0);
  const [youWin, setYouWin] = useState(false);
  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    clearBadge();
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => (document.title = `Doggo Match`), []);

  useEffect(() => {
    let pickTimer;
    let gameTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }
    const checkWin = cards.filter((card) => !card.matched);
    if (cards.length && checkWin.length < 1) {
      console.log("You win!");
      setWins(wins + 1);
      setYouWin(true);
      setBadge();
      gameTimer = setTimeout(() => {
        console.log("game timeout");
        setYouWin(false);
        handleTurn();
        setCards(shuffle);
      }, 2000);
    }
    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />

      {!youWin && (
        <div className="grid">
          {cards.map((card) => {
            const { image, id, matched } = card;
            return (
              <Card
                key={id}
                image={image}
                selected={card === pickOne || card === pickTwo || matched}
                onClick={() => handleClick(card)}
              />
            );
          })}
        </div>
      )}
      {youWin && <YouWin />}
    </>
  );
}

export default App;
