import PropTypes from "prop-types";

const Board = ({ boardId, cardsData, addLikes }) => {
    // board = { board_id: 1, title: "...", owner: "..." }
    // onBoardSelect = function to call when clicked
    // isSelected = boolean, true if this board is currently selected

    const cards = cardsData.map((cardData) => {
    return <Card 
      key={cardData.id}
      card={cardData}
      onAddLike={addLikes}
    />;
    });
    return (
        <>
            {/* <h4>{board.title}</h4>
            <p>Owner: {board.owner}</p> */}
            {cards}
        </>
    );
};

// PropTypes 
Board.propTypes = {
    boardId: PropTypes.number.isRequired,
    cardsData: PropTypes.array.isRequired,
    addLikes: PropTypes.func.isRequired,
};

export default Board;