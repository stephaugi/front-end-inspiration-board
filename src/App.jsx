import { useState, useEffect } from 'react';
import './App.css';
import NewCardForm from './components/NewCardForm';
import Card from './components/Card';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
import Modal from './components/Modal';
import axios from 'axios';


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

// const convertFromAPI = (apiTask) => {
//   const newTask = {
//     id: apiTask.id,
//     title: apiTask.title,
//     isComplete: apiTask.is_complete,
//   };
//   return newTask;
// };


const convertBoardFromAPI = (apiBoard) => {
  const newBoard = {
    id: apiBoard.id,
    owner: apiBoard.owner,
    title: apiBoard.title,
    cardIds: apiBoard.card_ids ? apiBoard.card_ids : null
  };
  delete apiBoard.card_ids;
  return newBoard;
}

const convertCardFromAPI = (apiCard) => {
  const newCard = {
    id: apiCard.id,
    message: apiCard.message,
    likesCount: apiCard.likes_count ? apiCard.likes_count : null,
    boardId: apiCard.board_id
  };
  delete newCard.likes_count;
  delete newCard.board_id

  return newCard;
};

const getAllCardsAPI = (boardId) => {
  return axios.get(`${VITE_APP_BACKEND_URL}/boards/${boardId}/cards`)
  .then(response => {
    const result = response.data
    result.map(card => {
      return convertCardFromAPI(card)
    })
  })
  .catch(error => console.log(error));
};

const getAllBoardsAPI = () => {
  return axios.get(`${VITE_APP_BACKEND_URL}/boards`)
  .then(response => response.data)
  .catch(error => console.log(error));
}

const createNewCardAPI = (inputData) => {
  const requestBody = {
    message: inputData.message,
    likes_count: inputData.likesCount,
    board_id: inputData.boardId,
  }
  return axios.post(`${VITE_APP_BACKEND_URL}/boards/${inputData.boardId}/cards`)
  .then(response => response.data)
  .catch(error => console.log(error));
};


function App() {
  const [cardsData, setCardsData] = useState([]);

  // for testing ,do we want to change this ?
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState([]);
  
  const getAllCards = () => {
    // api call that returns cards based on ID
    // update cards data with response.data
    return getAllCardsAPI(selectedBoardId)
      .then(response => setCardsData(response))
      .catch(error => console.log(error));
  };
  

  useEffect(() => {
    getAllBoardsAPI()
    .then(boards => {
      const newBoards = boards.map(convertBoardFromAPI);
      setBoardsData(newBoards);
      setSelectedBoard(newBoards[0]); 
    });
    // .then(setCardsData(getAllCards(selectedBoardId)));
  }, []);


  // useEffect(() => {
  //   if (selectedBoardId) {
  //     getAllCardsAPI(selectedBoardId)
  //     .then(cards => setBoardsData(cards));
  //   }
  // }, [selectedBoardId]);


  // Board related functions
  const createNewBoard = (inputData) => {
    console.log(inputData);
    return setBoardsData(prevBoardsData => [inputData, ...prevBoardsData]);
  };

  const selectBoard = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setSelectedBoardId(inputValue);
    getAllCards(inputValue)
      .then(cards => setCardsData(cards));
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
  const makeControlledSelect = (inputName, boardsData) => {
    // get list of boards, input id as value and board title as the display
    const selectOptions = boardsData.map(board => {
        return <option
        className='selectBoard'
        key={board.id}
        value={board.id}>
            {board.title}
        </option>
    });
    return <select name={inputName} onChange={selectBoard}>
    {selectOptions}
    </select>;
  };
  const boards = boardsData.map(board => {
    return <Board 
      key={board.id}
      boardId={board.id}
      cardsData={cardsData}
      addLikes={addLikes}
    />;
  });
  
  {selectedBoard ? boards : ''}


  return (<>
    <div className='boardFormLayout'>
      <NewBoardForm onFormSubmit={createNewBoard} />
    </div>
    
    <div className='boardContainer'>
      {makeControlledSelect('boards', boardsData)}
    </div>

    <div className='cardFormLayout'>
      {/* <NewCardForm onFormSubmit={createNewCard} boards={boardsData} /> */}
    </div>
    {/* <div className='cardContainer'>
      {cards}
    </div> */}
    <Modal
    onFormSubmit={createNewCard} boards={boardsData}/>
  </>
  )
}

export default App;
