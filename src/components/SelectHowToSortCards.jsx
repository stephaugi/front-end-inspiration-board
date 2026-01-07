const SelectHowToSortCards = ({ sortOption, handleSortChange }) => {
  return (
    <div className="board-control">
      <label htmlFor='selectSortingCardsOn'>Sort Cards By: </label>
      <select id='selectSortingCardsOn'value={sortOption} onChange={handleSortChange}>
        <option value="id_asc">Oldest first</option>
        <option value="id_desc">Recent First</option>
        <option value="a_z">A-Z</option>
        <option value="z_a">Z-A</option>
        <option value="likes_desc">Rating: high to low</option>
      </select>
    </div>
  )
};

export default SelectHowToSortCards