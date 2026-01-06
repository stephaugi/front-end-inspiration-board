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
    const [inputErrorToggle, setInputErrorToggle] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(true)

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
        });
        checkCharLength(inputValue);
    };

    const checkCharLength = (inputValue) => {
        if (inputValue.length > 40 || inputValue.length === 0) {
            setInputErrorToggle(true);
            setDisableSubmit(true);
        } else {
            setInputErrorToggle(false);
            setDisableSubmit(false);
        }

    };

    const inputError = inputErrorToggle && <p className='inputErrorMessage'>Message must be under 40 characters!</p>

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
                {inputError}
            </div>
            <div>
                <label htmlFor={'inputmessage'}>
                </label>
            </div>
        </div>
        <input className='submitButton' type='submit' value='Create Card' disabled={disableSubmit}/>
    </form>
    </>
    
};

NewCardForm.propType = {
    onFormSubmit: PropTypes.func.isRequired,
    selectedBoard: PropTypes.number,
}

export default NewCardForm;