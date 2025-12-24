import { useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import NewCardForm from './NewCardForm';


const Modal = ({onFormSubmit, boards}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const modalWindow = (<>
      <div className='form'>
          <div className='formContainer'>
            <h2>Create a New Card</h2>
              <NewCardForm
              onFormSubmit={onFormSubmit}
              onModalClose={toggleModal}
              boards={boards}
              />
          </div>
        </div>
      <div className='overlay__background' onClick={toggleModal}>
      </div>
  </>);

  const modalButton = (<div className='modalButtonContainer'><button className='openModalButton' onClick={toggleModal}>+</button></div>);

  return modalOpen ? modalWindow : modalButton;
};

Modal.propType = {
    onFormSubmit: PropTypes.func.isRequired,
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        })
    )
}

export default Modal;