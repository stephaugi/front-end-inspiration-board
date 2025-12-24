import { useState } from 'react';
import PropTypes from 'prop-types';
// import './NewBoardForm.css';

const kDefaultBoardForm = {
    title: '',
    owner: ''
};
const NewBoardForm = ({ onFormSubmit }) => {
    const [boardFormData, setBoardFormData] = useState(kDefaultBoardForm);

    const makeControlledInput = (inputName, placeholder) => {
        return <>
        <input
        type='text'
        name={inputName}
        id={`input-${inputName}`}
        value={boardFormData[inputName]}
        placeholder={placeholder}
        onChange={updateFormChange}
        required
        />
        </>
    };

const updateFormChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setBoardFormData(prevFormData => {
            return {
                ...prevFormData,
                [inputName]: inputValue
            };
        });
    console.log(inputName);
    console.log(inputValue);
    };

const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(boardFormData);
        setBoardFormData(kDefaultBoardForm);
    };
return <>
        <section className="new-board-form">
            <h3>Create a New Board</h3>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="input-title">Title</label>
                    {makeControlledInput('title', 'Enter board title...')}
                </div>

                <div className="form-group">
                    <label htmlFor="input-owner">Owner</label>
                    {makeControlledInput('owner', 'Your name...')}
                </div>

                <button type="submit">Create Board</button>
            </form>
        </section>
    </>;
};

NewBoardForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
};  

export default NewBoardForm;