import PropTypes from "prop-types";
import './Board.css';
import Card from './Card';

const Board = ({ boardId, cardsData, addLikes, deleteCard }) => {

    const cards = cardsData.map((cardData, i) => {
    return <Card 
        key={cardData.id}
        card={cardData}
        onAddLike={addLikes}
        onDeleteCard={deleteCard}
        nthCard={i}
    />;
    });
    return (
        <>
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
    deleteCard: PropTypes.func.isRequired, 
};

export default Board;