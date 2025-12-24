import { useState } from 'react';
import './App.css';
import NewCardForm from './components/NewCardForm';
import Card from './components/Card';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
import Modal from './components/Modal';
import Drawer from './components/drawer';


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
    id: 1523,
    message: 'this is a card',
    likesCount: 5,
    boardId: 2,
};

// api boards/1/cards get request response
// [
//     {
//         "board_id": 1,
//         "id": 5,
//         "likes_count": 0,
//         "message": "AI but make it super cool 😎"
//     },
// ]


// board_id or id ?
const boardsDataTest = [
    {
        id: 42376,
        title: 'board1',
        owner: 'owner1'
    },
    {
        id: 2345,
        title: 'board2',
        owner: 'owner2'
    },
    {
        id:23626,
        title: 'board3',
        owner: 'owner3'
    }
];

const getAllCards = (boardId) => {
  // api call that returns cards based on ID
  // update cards data with response.data
  console.log('get those cards');
};

function App() {
  const [cardsData, setCardsData] = useState([cardTest]);

  // for testing ,do we want to change this ?
  const [boardsData, setBoardsData] = useState(boardsDataTest);
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
      key={boardData.id}
      board={boardData}
      isSelected={selectedBoardId === boardData.id}
      onBoardSelect={selectBoard}
    />;
  });

  const cards = cardsData.map((cardData, i) => {
    return <Card 
      key={i}
      card={cardData}
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
      {/* <NewCardForm onFormSubmit={createNewCard} boards={boardsData} /> */}
    </div>
    <div className='cardContainer'>
      {cards}
    </div>
    <Modal
    onFormSubmit={createNewCard} boards={boardsData}/>
    <Drawer />
  </>
  )
}

export default App;
