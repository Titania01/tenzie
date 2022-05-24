import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(allNewDice());

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const rollDice = () => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  };

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceEl = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="container">
      <div className="dice-wrapper text-center">
        <h1 className="font-bold mt-8 text-3xl text=[#2B283A]">Tenzies</h1>
        <p className="text-[#4A4E74] max-w-sm">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceEl}</div>
        <button className="roll-dice" onClick={rollDice}>
          Roll
        </button>
      </div>
    </main>
  );
}

export default App;
