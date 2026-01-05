import PropTypes from "prop-types";
import './Board.css';
import Card from './Card';

const Board = ({ boardId, cardsData, addLikes }) => {

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
            <div className='cardContainer'>
                {cards}
            </div>
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