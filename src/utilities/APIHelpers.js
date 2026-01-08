import axios from 'axios';

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

const getAllBoardsAPI = () => {
  return axios.get(`${VITE_APP_BACKEND_URL}/boards`)
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

const createNewBoardAPI = (inputData) => {
  return axios.post(`${VITE_APP_BACKEND_URL}/boards`, inputData)
  .then(response => response.data)
  .catch(error => console.log(error));
}

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

const convertCardFromAPI = (apiCard) => {
  const newCard = {
    id: apiCard.id,
    message: apiCard.message,
    likesCount: apiCard.likes_count ? apiCard.likes_count : null,
    boardId: apiCard.board_id
  };
  return newCard;
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

export { convertBoardFromAPI, createNewBoardAPI, createNewCardAPI, convertCardFromAPI, deleteCardAPI, getAllBoardsAPI, getAllCardsAPI, likeCardForAPI };