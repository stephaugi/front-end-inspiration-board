const SelectBoardToView = ({ boards, selectBoard }) => {
  const selectOptions = boards.map(board => {
        return <option
        className='selectBoard'
        key={board.id}
        value={board.id}>
            {board.title}
        </option>
    });
  return (
    <div className="board-control">
      <label htmlFor="select-board-dropdown">Select Board to View:</label>
      <select
        id='select-board-dropdown'
        onChange={selectBoard}
      >
        {selectOptions}
      </select>
    </div>
  )
}

export default SelectBoardToView;