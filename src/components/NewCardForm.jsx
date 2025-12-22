import { useState } from 'react';

const kDefaultCardForm = {
    message: '',
    likesCount: 0,
    boardId: ''
};

const boardsData = [
    {
        id: 456,
        title: 'board1'
    },
    {
        id: 2,
        title: 'board2'
    },
    {
        id:3,
        title: 'board3'
    }
]

const NewCardForm = ({ onFormSubmit }) => {
    const [cardFormData, setCardFormData] = useState(kDefaultCardForm);

    // make form
    const makeControlledInput = (inputName) => {
        return <>
        <input
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
        console.log(inputName);
        console.log(inputValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(cardFormData);
    };
    return <>

    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor={'inputmessage'}>
            Message
            {makeControlledInput('message')}
        </label>
    </div>
    <div>
        <label htmlFor={'inputmessage'}>
            Board
            {makeControlledSelect('boardId', boardsData)}
        </label>
    </div>
    <input type='submit' value='Create Card'/>
    </form>
    </>
    
};

export default NewCardForm;