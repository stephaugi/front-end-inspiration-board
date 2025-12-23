import PropTypes from 'prop-types';
import './Card.css'

const Card = ({id, message, likesCount, boardId, onAddLike}) => {
    const handleAddLikes = () => {
        onAddLike(id);
        console.log(`This post id is ${id}`);
    };

    return <>
    <article className='card--style'>
        <h2>
        {message}
        <div className='footer--style'>
            {likesCount} <button onClick={handleAddLikes}>❤️</button>
        </div>
        </h2></article></>
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    likesCount: PropTypes.number.isRequired,
    boardId: PropTypes.number.isRequired,
    onAddLike: PropTypes.func.isRequired,
};

export default Card;