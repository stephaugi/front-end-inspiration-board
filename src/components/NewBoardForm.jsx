import { useState } from 'react';

const NewBoardForm = ({createNewBoard}) => {
    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');

const handleSubmit = (event) => {
        event.preventDefault();
        const newBoard = {
            title: title,
            owner: owner
        };
        createNewBoard(newBoard);
        setTitle('');
        setOwner('');
    }  
}