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
    const [disableSubmit, setDisableSubmit] = useState(true)
    const [errMsg, setErrMsg] = useState('Message cannot be empty!')

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
        setErrMsg(checkCharLength(inputValue));
    };

    const checkCharLength = (inputValue) => {
        if (inputValue.length > 40) {
            setDisableSubmit(true);
            return 'Message must be under 40 characters!'
        } else if (inputValue.length === 0) {
            setDisableSubmit(true)
            return 'Message cannot be empty!'
        } else {
            setDisableSubmit(false);
            return '';
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(cardFormData);
    };

    return (
    <>
        <form onSubmit={handleSubmit}>
            <div className='formContainer'>
                <div>
                    <label htmlFor={'inputmessage'}>
                        Message
                        {makeControlledInput('message')}
                    </label>
                    <p className='inputErrorMessage'>{errMsg}</p>
                </div>
                <div>
                    <label htmlFor={'inputmessage'}>
                    </label>
                </div>
            </div>
            <input className='submitButton' type='submit' value='Create Card' disabled={disableSubmit}
            />
        </form>
    </>
    )
};

NewCardForm.propType = {
    onFormSubmit: PropTypes.func.isRequired,
    selectedBoardId: PropTypes.number.isRequired,
}

export default NewCardForm;