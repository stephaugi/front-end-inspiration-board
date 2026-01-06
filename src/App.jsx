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

// sort function to order cards
const sortAlphabeticallyAZ = (cardsData) => {
  return [...cardsData].sort((a, b) => {
    if (a.message.toLowerCase() < b.message.toLowerCase()) {
      return -1;
    }
    if (a.message.toLowerCase() > b.message.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

const sortAlphabeticallyZA = (cardsData) => {
  return [...cardsData].sort((a, b) => {
    if (a.message.toLowerCase() < b.message.toLowerCase()) {
      return 1;
    }
    if (a.message.toLowerCase() > b.message.toLowerCase()) {
      return -1;
    }
    return 0;
  });
};


const sortByLikes = (cardsData) => {
  return [...cardsData].sort((a, b) => b.likesCount - a.likesCount);
};

const sortByIdAsc = (cardsData) => {
  return [...cardsData].sort((a, b) => a.id - b.id);
}

const sortByIdDesc = (cardsData) => {
  return [...cardsData].sort((a, b) => b.id - a.id);
}

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [sortOption, setSortOption] = useState('id_asc'); // 'id', 'alphabetical', 'likes' , by default sort by id
  
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
    const inputValue = event.target.value;
    setSelectedBoardId(inputValue);
    getAllCards(inputValue);
  };

  // Handles sort option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
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

  //Gets sorted cards based on current sort option
  const getSortedCards = () => {
    let sortedCards = [...cardsData];
    if (sortOption === 'a_z') {
      sortedCards = sortAlphabeticallyAZ(sortedCards);
    } else if (sortOption === 'z_a') {
      sortedCards = sortAlphabeticallyZA(sortedCards);
    } else if (sortOption === 'likes_desc') {
      sortedCards = sortByLikes(sortedCards);
    } else if (sortOption === 'id_asc') {
      sortedCards = sortByIdAsc(sortedCards)
    } else if (sortOption === 'id_desc') {
      sortedCards = sortByIdDesc(sortedCards);
    }
    return sortedCards;
  };


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

  const makeSortSelect = () => {
    return (
      <select value={sortOption} onChange={handleSortChange}>
        <option value="id_asc">Oldest first</option>
        <option value="id_desc">Recent First</option>
        <option value="a_z">A-Z</option>
        <option value="z_a">Z-A</option>
        <option value="likes_desc">Rating: high to low</option>
      </select>
    )
  }
  const boards = <Board 
        key={selectedBoardId}
        boardId={selectedBoardId}
        cardsData={getSortedCards()} // pass sorted cards
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
    <div className='sortContainer'>
      <div>Sort:</div>{makeSortSelect()}
    </div>
    {boards}
    <Modal
    onFormSubmit={createNewCard} currentBoardId={selectedBoardId}/>
  </>
  )
}

export default App;