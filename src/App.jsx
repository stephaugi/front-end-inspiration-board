import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
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
    message: 'this is a card',
    likesCount: 5,
    boardId: 2,
};

const getAllCards = (boardId) => {
  // api call that returns cards based on ID
  // update cards data with response.data
}

function App() {
  const [likesCount, setLikesCount] = useState(0);
  const [cardsData, setCardsData] = useState();
  
  const createNewCard = (inputData) => {
    console.log(inputData);
    console.log('this is on app level');
  }
  return (<>
  <NewCardForm onFormSubmit={createNewCard}/>
  <Card 
    message={cardTest.message}
    likesCount={cardTest.likesCount}
  />
  </>
  )
}

export default App
