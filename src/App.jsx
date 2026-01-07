import { useState, useEffect } from 'react';
import './App.css';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';
import Modal from './components/Modal';
import SelectBoardToView from './components/SelectBoardToView';
import SelectHowToSortCards from './components/SelectHowToSortCards';

import { 
  convertBoardFromAPI, 
  createNewBoardAPI, 
  createNewCardAPI, 
  convertCardFromAPI, 
  deleteCardAPI, 
  getAllBoardsAPI, 
  getAllCardsAPI, 
  likeCardForAPI 
} from './utilities/APIHelpers';

import { 
  sortAlphabeticallyAZ, 
  sortAlphabeticallyZA, 
  sortByIdAsc, 
  sortByIdDesc, 
  sortByLikes 
} from './utilities/SortingHelpers';

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [selectedBoardTitle, setSelectedBoardTitle] = useState(null);
  const [sortOption, setSortOption] = useState('id_asc');
  const [isFormCollapsed, setIsFormCollapsed] = useState(true);

  const toggleFormCollapse = () => {
    setIsFormCollapsed(!isFormCollapsed);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      const boardsFromAPI = await getAllBoardsAPI();
      const boards = boardsFromAPI.map(convertBoardFromAPI)
      setBoardsData(boards);
      if (boards.length > 0) {
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
    const boardTitle = boardsData.filter(board => {
      if (board.id == inputValue) {
      return board;
      }
    });
    setSelectedBoardTitle(boardTitle[0].title);
    getAllCards(inputValue);
  };

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

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet" />
      <header>
        <h1>Four Seasons Inspiration Board</h1>
      </header>
      
      <main>
        <div className='collapsible-container'>
          <button 
            className={`collapsible ${isFormCollapsed ? '' : 'active'}`}
            onClick={toggleFormCollapse}
          >
            {isFormCollapsed ? '➕' : '➖'} Create a New Board
          </button> 
        
          {!isFormCollapsed && (
            <div className='collapsible-content'>
              <NewBoardForm onFormSubmit={createNewBoard} />
            </div>
          )}
        </div>

        <div id='board-views'>
          <SelectBoardToView boards={boardsData} selectBoard={selectBoard}/>
        </div>
        <div id='board-title'>
          <h2>{selectedBoardTitle}</h2>
          <SelectHowToSortCards sortOption={sortOption} handleSortChange={handleSortChange}/>
        </div>

        <Board 
          key={selectedBoardId}
          boardId={selectedBoardId}
          cardsData={getSortedCards()}
          addLikes={addLikes}
          deleteCard ={deleteCard}
        />

        <Modal
          onFormSubmit={createNewCard}
          currentBoardId={selectedBoardId}
        />
      </main>

      <footer>
        <p>Ada C24: Stephanie Lin Chen, Iris (Hok Yin) Cheung, Riley Drellishak, and Gina Song</p>
      </footer>

    </>
  )
}

export default App;