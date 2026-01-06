import PropTypes from 'prop-types';
import './Card.css'

const Card = ({card, onAddLike, onDeleteCard}) => {
    const {id, message, likesCount, boardId} = card
    const handleAddLikes = () => {
        onAddLike(id);
    };

    const handleDeleteCard = () => {
        onDeleteCard(id);
    };

    return <>
    <article className='card--style'>
        <h2>
        {message}
        <div className='footer--style'>
            {likesCount} <button onClick={handleAddLikes}>❤️</button>
            <button onClick={handleDeleteCard}>X</button>
        </div>
        </h2></article></>
};

Card.propTypes = {
    card: PropTypes.shape(
        {
        id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        likesCount: PropTypes.number.isRequired,
        boardId: PropTypes.number.isRequired,
        }
    ),
    onAddLike: PropTypes.func.isRequired,
    onDeleteCard: PropTypes.func.isRequired,

};

export default Card;