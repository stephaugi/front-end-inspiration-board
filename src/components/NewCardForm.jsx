import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

const kDefaultCardForm = {
    message: '',
    likesCount: 0,
    boardId: ''
};

const NewCardForm = ({ onFormSubmit, selectedBoardId }) => {
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

    const updateFormChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setCardFormData(prevFormData => {
            return {
                ...prevFormData,
                [inputName]: inputValue,
                boardId: selectedBoardId
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
                </label>
            </div>
        </div>
        <input className='submitButton' type='submit' value='Create Card'/>
    </form>
    </>
    
};

NewCardForm.propType = {
    onFormSubmit: PropTypes.func.isRequired,
    selectedBoard: PropTypes.number,
}

export default NewCardForm;