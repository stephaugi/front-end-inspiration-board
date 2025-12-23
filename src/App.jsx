import { useState } from 'react';
import './App.css';
import NewCardForm from './components/NewCardForm';
import Card from './components/Card';

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

// axios.get(`${VITE_APP_BACKEND_URL}/boards`, {
//     // ...

// Board post request
// {
//     "title": ...,
//     "owner": ...
// }

// Card post request
// {
//     "message": ...,
//     "likes_count": ...,
//     "board_id": ...
// }

const cardTest = {
    id: 1,
    message: 'this is a card',
    likesCount: 5,
    boardId: 2,
};

const boardsData = [
    {
        id: 456,
        title: 'board1'
    },
    {
        id: 2,
        title: 'board2'
    },
    {
        id:3,
        title: 'board3'
    }
]

const getAllCards = (boardId) => {
  // api call that returns cards based on ID
  // update cards data with response.data
  console.log('get those cards');
};

function App() {
  const [cardsData, setCardsData] = useState([cardTest]);
  
  const createNewCard = (inputData) => {
    console.log(inputData);
    return setCardsData(prevCardsData => [inputData, ...prevCardsData]);
  };

  const addLikes = (id) => {
    return setCardsData(prevCardsData => {
      return prevCardsData.map(card => {
        if (card.id == id) {
          return {...card, likesCount: card.likesCount + 1}
      } else return card;
    });
  }
)};

  const cards = cardsData.map(cardData => {
    return <Card 
    key={cardData.id}
    id={cardData.id}
    message={cardData.message}
    likesCount={cardData.likesCount}
    boardId={cardData.boardId}
    onAddLike={addLikes}
    />;
  });

  return (<>
    <div className='cardFormLayout'>
      <NewCardForm onFormSubmit={createNewCard} boards={boardsData} />
    </div>
    <div className='cardContainer'>
      {cards}
    </div>
  
  </>
  )
}

export default App;
