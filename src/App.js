import React from 'react'
import Die from './components/Die';
import './App.css';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import GameStats from './components/GameStats'

let interval

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [gameTime, setGameTime] = React.useState(0);
  React.useEffect(() =>{
    initializeGame();
    return () => clearInterval(interval)
  }, []);
  React.useEffect(()=> {
    let firstVal = dice[0].value;
    const allHeld = dice.every(die => die.isHeld);
    const sameValue = dice.every(die => die.value === firstVal)

    if(sameValue && allHeld){
      setTenzies(true);
      clearInterval(interval);
    }
  }, [dice])
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
    function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
    }
    const initializeGame = () => {
      setGameTime(0);
      setRollCount(0)
      setTenzies(false)
      setDice(allNewDice())
      interval = setInterval(() => {
        setGameTime(oldState => {
          return oldState + 1
        });
      }, 1000)
    }
    const rollDice = () => {
      if(tenzies){
        initializeGame()
      }else{
        setRollCount(oldState => oldState + 1)
        setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
            die :
            generateNewDie()
        }))
      }
    }

    function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
      }))
    }
    
    const diceElements = dice.map(die => (
      <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
      />
    ))
    
  return (
    <div className="App">
      { tenzies && <Confetti /> }
      <main>
        <GameStats count={rollCount} time={gameTime} />
        <div className='die_container'>
          {diceElements}
        </div>
        <button 
          onClick={rollDice} 
          className='rol_dice'
        >
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </main>
    </div>
  );
}

export default App;
