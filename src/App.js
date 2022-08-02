import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'

/* array outside of component becuase they are constants and won't need to change.
 * and do not need to any component state
 * The array won't get recreated everytime the component is reevaluated
*/
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png" , matched: false},
  { "src": "/img/ring-1.png" , matched: false},
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png" , matched: false},
  { "src": "/img/sword-1.png", matched: false },
]


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)



  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
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
         
        setDisabled(true)

        if(choiceOne.src === choiceTwo.src){
          //updating the card state, by taking the prev card state
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === choiceOne.src) {
                  //setting cards macthed property to true
                 return {...card, matched: true}
              } else{
                 return card
              }
            })
          })

          resetTurn()
        } else{
          
          setTimeout(() => resetTurn(), 1000)
        }
      }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  //reset choice and increase turn count
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start new game automatically
  useEffect(() => {
  shuffleCards();
  }, [])

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
           flipped={card === choiceOne || card === choiceTwo || card.matched}
           disabled={disabled}
           />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App