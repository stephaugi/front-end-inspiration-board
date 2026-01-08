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

export { sortAlphabeticallyAZ, sortAlphabeticallyZA, sortByIdAsc, sortByIdDesc, sortByLikes };