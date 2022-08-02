import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'

/* array outside of component becuase they are constants and won't need to change.
 * and do not need to any component state
 * The array won't get recreated everytime the component is reevaluated
*/
const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)



  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) =>{    
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  /* useEffect fires when the component first mounts automatically 
   * and fires again whenever the depandency changes
   * depandencies in this case are [choiceOne, choiceTwo] (whenever they are updated it will fire)
   */
  useEffect(() => {
      if(choiceOne && choiceTwo){

        if(choiceOne.src === choiceTwo.src){
          console.log("selected cards match")
          resetTurn()
        } else{
          console.log("selected cards do not match")
          resetTurn()
        }
      }
  }, [choiceOne, choiceTwo])

  //reset choice and increase turn count
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
           key={card.id} 
           card={card}
           handleChoice={handleChoice}
           />
        ))}
      </div>

    </div>
  );
}

export default App