import { useState } from 'react';
import './App.css';
import NewCardForm from './components/NewCardForm';
import Card from './components/Card';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';


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


// board_id or id ?
const boardsData = [
    {
        id: 456,
        title: 'board1',
        owner: 'owner1'
    },
    {
        id: 2,
        title: 'board2',
        owner: 'owner2'
    },
    {
        id:3,
        title: 'board3',
        owner: 'owner3'
        
    }
]

const getAllCards = (boardId) => {
  // api call that returns cards based on ID
  // update cards data with response.data
  console.log('get those cards');
};

function App() {
  const [cardsData, setCardsData] = useState([cardTest]);

  // for testing ,do we want to change this ?
  const [boardsData, setBoardsData] = useState();
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  
  // Board related functions
  const createNewBoard = (inputData) => {
    console.log(inputData);
    return setBoardsData(prevBoardsData => [inputData, ...prevBoardsData]);
  };

  const selectBoard = (boardId) => {
    setSelectedBoardId(boardId);
    getAllCards(boardId);
  };

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

  const boards = boardsData.map(boardData => {
    return <Board 
      key={boardData.board_id}
      boardId={boardData.board_id}
      title={boardData.title}
      owner={boardData.owner}
      isSelected={selectedBoardId === boardData.board_id}
      onBoardSelect={selectBoard}
    />;
  });

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
    <div className='boardFormLayout'>
      <NewBoardForm onFormSubmit={createNewBoard} />
    </div>
    <div className='boardContainer'>
      {boards}
    </div>

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
