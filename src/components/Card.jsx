import PropTypes from 'prop-types';
import './Card.css'
import { useState } from 'react';

const Card = ({card, onAddLike, onDeleteCard, nthCard}) => {
    const [cardHover, setCardHover] = useState(false);
    const {id, message, likesCount, boardId} = card;

    const handleAddLikes = () => {
        onAddLike(id);
    };

    const handleDeleteCard = () => {
        onDeleteCard(id);
    };
    
    const nthCardStyle = { "--i": nthCard }

    const deleteButton = cardHover && <button className='deleteButton--style' onClick={handleDeleteCard}>x</button>

    return <>
    <article className='card--style' style={nthCardStyle} onMouseOver={()=>setCardHover(true)} 
    onMouseOut={()=>setCardHover(false)}>
        {deleteButton}
        <div className='cardContent--style'>
            <p className='cardMessage--style'>
                {message}
            </p>
            <div className='footer--style'> 
                {likesCount} <button className='likeButton--style' onClick={handleAddLikes}>❤️</button>
            </div>
        </div>
    </article></>
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
    nthCard: PropTypes.number.isRequired,
};

export default Card;