import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

const kDefaultCardForm = {
    message: '',
    likesCount: 0,
    boardId: ''
};

const NewCardForm = ({ onFormSubmit, boards }) => {
    const [cardFormData, setCardFormData] = useState(kDefaultCardForm);

    // make form
    const makeControlledInput = (inputName) => {
        return <>
        <input
        className='inputField'
        type='text'
        name={inputName}
        id={`input-${inputName}`}
        value={cardFormData[inputName]}
        onChange={updateFormChange}
        />
        </>
    };

    const makeControlledSelect = (inputName, boards) => {
        // get list of boards, input id as value and board title as the display
        const selectOptions = boards.map(board => {
            return <option
            className='selectBoard'
            key={board.id}
            value={board.id}>
                {board.title}
            </option>
        });
        return <select name={inputName} onChange={updateFormChange}>
        {selectOptions}
        </select>;
    };

    const updateFormChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setCardFormData(prevFormData => {
            return {
                ...prevFormData,
                [inputName]: inputValue
            };
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(cardFormData);
    };
    return <>
    <form onSubmit={handleSubmit}>
        <div className='formContainer'>
            <div>
                <label htmlFor={'inputmessage'}>
                    Message
                    {makeControlledInput('message')}
                </label>
            </div>
            <div>
                <label htmlFor={'inputmessage'}>
                    Board
                    {makeControlledSelect('boardId', boards)}
                </label>
            </div>
        </div>
        <input className='submitButton' type='submit' value='Create Card'/>
    </form>
    </>
    
};

NewCardForm.propType = {
    onFormSubmit: PropTypes.func.isRequired,
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        })
    )
}

export default NewCardForm;