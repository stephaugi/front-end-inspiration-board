import { useState, useEffect } from 'react';
import './App.css';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
import Modal from './components/Modal';
import axios from 'axios';

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

const getAllBoardsAPI = () => {
  return axios.get(`${VITE_APP_BACKEND_URL}/boards`)
  .then(response => response.data)
  .catch(error => console.log(error));
}

const createNewBoardAPI = (inputData) => {
  return axios.post(`${VITE_APP_BACKEND_URL}/boards`, inputData)
  .then(response => response.data)
  .catch(error => console.log(error));
}

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
  return newCard;
};

const getAllCardsAPI = (boardId) => {
  return axios.get(`${VITE_APP_BACKEND_URL}/boards/${boardId}/cards`)
  .then(response => {
    const result = response.data
    return result.map(card => {
      const convertedCard = convertCardFromAPI(card)
      return convertedCard;
    });
  })
  .catch(error => console.log(error));
};

const createNewCardAPI = (inputData) => {
  const requestBody = {
    message: inputData.message,
    likes_count: inputData.likesCount,
    board_id: inputData.boardId,
  }
  return axios.post(`${VITE_APP_BACKEND_URL}/boards/${inputData.boardId}/cards`, inputData)
  .then(response => response.data)
  .catch(error => console.log(error));
};

const deleteCardAPI = (cardId) => {
  return axios.delete(`${VITE_APP_BACKEND_URL}/cards/${cardId}`)
  .then(response => response.data)
  .catch(error => console.log(error));
};

const likeCardForAPI = (cardId) => {
  return axios.put(`${VITE_APP_BACKEND_URL}/cards/${cardId}/like`)
  .catch(error => console.log(error))
}

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  
  useEffect(() => {
    const fetchBoards = async () => {
      const boardsFromAPI = await getAllBoardsAPI();
      const boards = boardsFromAPI.map(convertBoardFromAPI)
      setBoardsData(boards);
      if (boardsData) {
        const firstBoard = boards[0];
        const defaultBoardId = firstBoard.id
        setSelectedBoardId(defaultBoardId)

        const cardsFromAPI = await getAllCardsAPI(defaultBoardId);
        setCardsData(cardsFromAPI)
      }
    }
    fetchBoards();
  }, [])

  const getAllCards = (boardId) => {
    return getAllCardsAPI(boardId)
      .then(response => {
        return setCardsData(response)})
      .catch(error => console.log(error));
  };

  // Board related functions

  const createNewBoard = (inputData) => {
    createNewBoardAPI(inputData)
    .then(newBoardFromAPI => {
      const convertedBoard = convertBoardFromAPI(newBoardFromAPI);
      setBoardsData(prevBoardsData => [convertedBoard, ...prevBoardsData]);
    })
    .catch(error => console.log(error));
  };

  const selectBoard = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setSelectedBoardId(inputValue);
    getAllCards(inputValue);
  };

  const createNewCard = (inputData) => {
    createNewCardAPI(inputData)
    .then(newCardFromAPI => {
      const convertedCard = convertCardFromAPI(newCardFromAPI);
      setCardsData(prevCardsData => [convertedCard, ...prevCardsData]);
    })
    .catch(error => console.log(error));
  }

  const deleteCard = (cardId) => {
    return deleteCardAPI(cardId)
      .then(() => {
        return setCardsData(prevCards => prevCards.filter(card => card.id !== cardId))
      });
    };

  const addLikes = (cardId) => {
    likeCardForAPI(cardId);
    setCardsData(prevCards => prevCards.map(card => 
      card.id === cardId ? {...card, likesCount: card.likesCount + 1}: card
    )
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
  const boards = <Board 
        key={selectedBoardId}
        boardId={selectedBoardId}
        cardsData={cardsData}
        addLikes={addLikes}
        deleteCard ={deleteCard}
      />;
  

  return (<>
    <div className='boardFormLayout'>
      <NewBoardForm onFormSubmit={createNewBoard} />
    </div>
    
    <div className='boardContainer'>
      {makeControlledSelect('boards', boardsData)}
    </div>
    {boards}
    <Modal
    onFormSubmit={createNewCard} currentBoardId={selectedBoardId}/>
  </>
  )
}

export default App;