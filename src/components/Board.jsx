const Board = ({ board, onBoardSelect, isSelected }) => {
    // board = { board_id: 1, title: "...", owner: "..." }
    // onBoardSelect = function to call when clicked
    // isSelected = boolean, true if this board is currently selected
    const handleClick = () => {
        onBoardSelect(board.board_id);
    };

    return (
        <div 
            className={`board-item ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <h4>{board.title}</h4>
            <p>Owner: {board.owner}</p>
            {/* another way to display: */}
            {/* <strong>{board.title}</strong> */}
            {/* <small className="board-owner">by {board.owner}</small> */}
        </div>
    );
};